const argv = require('yargs').argv;

module.exports = (gulp, $, config) => {
  const scriptsSpec = config.watchGlobs.scriptsSpec;
  const scripts = config.watchGlobs.scripts;
  const reportsDir = config.destPaths.reports;
  const covererageGlob = scripts
    // concat scriptsSpec but prepend it with '!' so spec files don't count for the coverage report
    .concat(scriptsSpec.map(c => `!${c}`))
    ;

  const task = () =>
    // this `gulp.src` is the rootDir config for jest. We just make it '.' because
    // all our assume the starting dir is the the project root (e.g.: `src/**/*.js`)
    //
    gulp.src('.')
      // we merge argv so we can override the configs via the command line
      // e.g.: npm test -- --watchAll
      .pipe($.jest.default({
        config: {
          collectCoverage: true,
          coverageReporters: ['text-summary', 'json', 'lcov'],
          collectCoverageFrom: covererageGlob,
          coverageDirectory: reportsDir
        },
        watchAll: argv.watchAll || false
      }))
      ;

  task.description = 'Cleans the build folder';
  return task;
};
