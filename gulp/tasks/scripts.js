const stream = require('../utils/browserSync').stream;
const handleError = require('../utils/handleError');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const webpackConfig = require('../../webpack.config');

module.exports = (gulp, $, config) => {
  const entryGlob = config.entryGlobs.scripts;
  const destPath = config.destPaths.scripts;
  const manifestDestPath = config.destPaths.revManifest;

  const task = () =>
    gulp.src(entryGlob)
      .pipe($.plumber(handleError))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe(gulpWebpack(webpackConfig(config), webpack))
      .pipe($.if(config.isProd, $.rev()))
      .pipe($.if(config.isProd, gulp.dest(destPath)))
      .pipe($.if(config.isProd, $.rev.manifest(manifestDestPath, {
        merge: true,
        base: destPath,
      })))
      .pipe(gulp.dest(destPath))
      .pipe(stream())
      ;

  task.description = 'Move all javscript files to the build';
  return task;
};
