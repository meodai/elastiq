function TaskHelpers(gulp, config) {
  if (this instanceof TaskHelpers === false) {
    return new TaskHelpers(gulp, config);
  }

  this.getTask = function getTask(task) {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    return require(`../tasks/${task}`)(this.gulp, this.$, this.config);
  };

  this.configure = function configure(configuration) {
    this.config = configuration;
  };

  // eslint-disable-next-line global-require
  this.$ = require('gulp-load-plugins')();
  this.config = null;
  this.gulp = gulp;
  this.configure(config);
}

module.exports = TaskHelpers;
