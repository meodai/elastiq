const fs = require('fs');
const yamljs = require('yamljs');
const pugIncludeGlob = require('pug-include-glob');
const merge = require('merge-stream');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const pageshelpers = require('../utils/pagesHelpers');
const handleError = require('../utils/handleError');
const configHelpers = require('../utils/configHelpers');
const transformer = require('jstransformer');
const md = require('jstransformer')(require('jstransformer-markdown-it'));
var base64Img = require('base64-img');

module.exports = (gulp, $, config) => {
  const entryGlob = config.entryGlobs.pages;
  const destPath = config.destPaths.pages;
  const contentPath = config.destPaths.content;
  const definitionGlob = config.entryGlobs.definitions;
  const manifestDestPath = config.destPaths.revManifest;
  let defaultLanguage = config.defaultLanguage;

  // Load the content for the page
  function loadContentForLanguage(language) {
    return yamljs.load(`${contentPath}${language}.yml`);
  }

  const task = () => {
    const languages = configHelpers.getAvailableLanguages(config);

    if (!defaultLanguage && languages.length > 1) {
      console.warn('There is more than one language defined. Consider adding a defaultLanguage on gulp/config.js. Alternatively, configure your server so it handles the root path of the project.');
      defaultLanguage = languages[0];
    }

    function getDestPath(language) {
      return destPath + configHelpers.getLanguagePath(language, languages, defaultLanguage);
    }

    // Returns the relative path between the page and the root of the web server
    const getRootPathFromPage = (file, language) => {
      // e.g.: /src/pages
      const originalPath = path.dirname(file.path);
      // e.g.: /src/pages/en
      const finalPath = `${originalPath}/${configHelpers.getLanguagePath(language, languages, defaultLanguage)}`;

      // e.g.: ..
      const relativePath = path.relative(finalPath, originalPath);

      // "" --> ""
      // ".." --> "../"
      return relativePath ? `${relativePath}/` : relativePath;
    };

    function loadMergedDefinitions() {
      return definitionGlob.map(d => glob.sync(d))
        .reduce((a, b) => a.concat(b), [])
        .reduce((acc, definitionPath) => {
          const normalizedPath = definitionPath
            .replace(config.entryPaths.root, '')
            .replace('/definition.yml', '')
            ;
          return _.merge(acc, {
            [normalizedPath]: yamljs.load(definitionPath),
          });
        }, {})
        ;
    }

    function compilePages(language) {
      const languageDestPath = getDestPath(language);

      return gulp.src(entryGlob)
        .pipe($.plumber(handleError))
        .pipe($.data((file) => {
          const mergedDefinitions = loadMergedDefinitions();
          return {
            data: loadContentForLanguage(language),
            relativePath: getRootPathFromPage(file, language),
            helpers: pageshelpers(config, mergedDefinitions),
            b64: base64Img.base64Sync,
            language,
          };
        }))
        .pipe($.pug({
          client: false,
          pretty: true,
          plugins: [
            pugIncludeGlob(),
          ]
        }))
        .pipe($.if(config.isProd, $.revReplace({
          manifest: fs.existsSync(manifestDestPath) && gulp.src(manifestDestPath),
        })))
        .pipe(gulp.dest(languageDestPath));
    }

    // Generate the pages for each language
    const pagesStreams = languages.map(compilePages);

    return merge(pagesStreams);
  };

  task.description = 'Generate all pages from the pug files';
  return task;
};
