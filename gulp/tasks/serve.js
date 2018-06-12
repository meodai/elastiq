const browserSync = require('../utils/browserSync');

const reload = browserSync.reload;

// eslint-disable-next-line max-statements
module.exports = (gulp, $, config) => {
  const task = () => {
    // Initialising the server
    browserSync.start(config.destPaths.root);

    // Start watching processes
    gulp.watch(config.watchGlobs.scripts, gulp.parallel('build:scripts'));
    gulp.watch(config.watchGlobs.styles, gulp.parallel('build:styles'));
    gulp.watch(config.watchGlobs.pages, gulp.series('build:pages', reload));
    gulp.watch(config.watchGlobs.content, gulp.series('build:content', 'build:pages', reload));
    gulp.watch(config.watchGlobs.assets, gulp.parallel('build:assets'));
    gulp.watch(config.watchGlobs.meta, { dot: true }, gulp.parallel('build:meta'));
    gulp.watch(config.watchGlobs.icons, gulp.parallel('build:icons-sprite'));
  };

  task.description = 'Serve the build folder';
  return task;
};
