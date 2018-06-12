module.exports = (gulp, $, config) => {
  const entryGlob = config.entryGlobs.meta;
  const destPath = config.destPaths.meta;

  const task = () => gulp.src(entryGlob, { dot: true })
      .pipe($.changed(destPath))
      .pipe(gulp.dest(destPath))
      ;

  task.description = 'Moves all the meta files to the build';
  return task;
};
