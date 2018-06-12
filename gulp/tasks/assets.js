module.exports = (gulp, $, config) => {
  const entryGlob = config.entryGlobs.assets;
  const destPath = config.destPaths.assets;
  const manifestPath = config.destPaths.revManifest;

  const task = () => gulp.src(entryGlob)
      .pipe($.changed(destPath))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(destPath)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestPath, { merge: true, base: destPath })))
      .pipe(gulp.dest(destPath))
      ;

  task.description = 'Moves all the assets to the build. While on production, also revs the assets.';
  return task;
};
