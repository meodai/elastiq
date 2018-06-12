const glob = require('glob');

module.exports = {
  getAvailableLanguages: (config) => {
    const entryPath = config.entryPaths.content;
    return glob.sync('*', { cwd: entryPath });
  },

  // Put the default language at the root
  getLanguagePath: (language, languages, defaultLanguage) => {
    // put files on root if there is only 1 language
    if (languages.length === 1) {
      return '';
    }

    // put the defaultLanguage pages on the root
    if (language === defaultLanguage) {
      return '';
    }

    return `${language}/`;
  }
};
