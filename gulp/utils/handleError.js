const gNotify = require('gulp-notify');
const bsNotify = require('./browserSync').notify;

module.exports = function notify(...args) {
  // Send error to the terminal with gulp-notify
  gNotify.onError({
    title: '<%= error.plugin %>',
    message: '<%= error.message %>',
  }).apply(this, args);

  // Send error to the browser with Browserify
  const error = args[0];
  const browserSynMsg = `Oh boy, there was a problem with: ${error.plugin} <br>` +
                        'Ckeck you terminal for more infos.';
  bsNotify(browserSynMsg, 6000);

  // Prevent gulp from hanging on this task
  this.emit('end');
};
