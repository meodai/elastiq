module.exports = () => {
  // where are the entry files of each type
  // note that this is different from all files.
  // e.g. /src/elements/button/style.scss
  // is not an entry file for styles (meaning it shouldn't get compiled)
  const entryGlobs = {
    // this will be webpack entries
    scripts: ['src/{layouts,pages}/**/*.js'],
    // this will be compiled as css files
    styles: ['src/{layouts,pages}/**/*.scss'],
    // this files will generate pages
    pages: ['src/pages/**/*.pug'],
    // this files will generate content files
    content: ['content/texts/**/*.yml'],
    assets: [
      'src/materials/**/*',
      '!src/materials/**/*.{yml,scss,pug,js}',
      'content/**/*',
      '!content/texts/**/*',
      '!content/texts'
    ],
    meta: ['src/meta/**/*'],
    definitions: ['src/**/definition.yml'],
    icons: ['src/materials/icons/*.svg'],
    tooling: ['gulp/**/*.js', 'gulpfile.js', 'webpack.config.js']
  };

  // Watch globs, whenever this files change, run the corresponding type task.
  // Note that this is different from the entryGlobs.
  // e.g. /src/elements/button/style.scss
  // needs to be watched, but is not an entry file.
  //
  // other example is definition files. even though they are not pages,
  // when they change, they have influence on the final html.
  const watchGlobs = {
    scripts: ['src/**/*.js'],
    scriptsSpec: ['src/**/*.spec.js'],
    styles: ['src/**/*.scss'],
    pages: ['src/**/*.pug', 'src/**/*.yml'],
    content: ['content/texts/**/*.yml'],
    assets: [
      'src/materials/**/*',
      'content/**/*',
    ],
    meta: ['src/meta/**/*'],
    icons: ['src/materials/icons/*.svg']
  };

  const entryPaths = {
    root: 'src/',
    pages: 'src/pages/',
    content: 'content/texts/',
  };

  const destPaths = {
    root: 'build/',
    scripts: 'build/js/',
    styles: 'build/css/',
    pages: 'build/',
    content: 'build/content/',
    assets: 'build/assets/',
    meta: 'build/',
    icons: 'build/assets/icons/',
    revManifest: 'build/rev-manifest.json',
    reports: 'reports/'
  };

  return {
    destPaths,
    entryPaths,
    entryGlobs,
    watchGlobs,
    isProd: process.env.NODE_ENV === 'production',
    defaultLanguage: 'en'
  };
};
