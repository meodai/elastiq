const del = require('del');

module.exports = (gulp, $, config) => {
  const task = () => del(config.destPaths.root);

  task.description = 'Cleans the build folder';
  return task;
};
