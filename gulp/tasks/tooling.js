module.exports = (gulp, $, config) => {
  const entryGlobs = config.watchGlobs.tooling;

  const task = () =>
    gulp.src(entryGlobs)
      .pipe($.eslint())
      .pipe($.eslint.format())
      ;

  task.description = 'Lints the tooling files.';
  return task;
};
