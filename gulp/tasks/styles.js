const fs = require('fs');
const stream = require('../utils/browserSync').stream;
const handleError = require('../utils/handleError');

module.exports = (gulp, $, config) => {
  const entryGlobs = config.entryGlobs.styles;
  const destPath = config.destPaths.styles;
  // previously rev files such as assets that might have been referenced
  // in the styles (and their path needs to be updated)
  const manifestDestPath = config.destPaths.revManifest;

  const task = () =>
    gulp.src(entryGlobs)
      .pipe($.plumber(handleError))
      .pipe($.sassGlob())
      .pipe($.if(!config.isProd, $.sourcemaps.init()))
      .pipe($.sass({
        includePaths: ['node_modules'],
        outputStyle: config.isProd ? 'compressed' : '',
      }))
      .pipe($.autoprefixer({ browsers: ['last 2 versions', 'ie 9'] }))
      .pipe($.if(!config.isProd, $.sourcemaps.write({ includeContent: true })))
      .pipe($.if(config.isProd, $.revReplace({
        manifest: fs.existsSync(manifestDestPath) && gulp.src(manifestDestPath),
      })))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(destPath)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestDestPath, {
        merge: true,
        base: destPath,
      })))
      .pipe(gulp.dest(destPath))
      .pipe(stream({ match: '**/*.css' }))
      ;

  task.description = 'Generate all stylesheets from the sass files';
  return task;
};
