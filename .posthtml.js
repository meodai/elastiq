var content = require('content.yml');

module.exports = {
  "plugins": {
    "posthtml-expressions": {
      locals: {
        content: content
      },
    },
    "posthtml-include": {
      root: "./",
    },
    "posthtml-markdown": {},
  },
};
