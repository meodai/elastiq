const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

module.exports = config => ({
  // Here the application starts executing
  // and webpack starts bundling
  // can be string | object {entryname: entrypath} | array
  // we are using a custom transformation that converts the entryGlobs on config
  // to a valid webpack entries object by using glob.sync.
  entry: config.entryGlobs.scripts
    .map(globPath => glob.sync(globPath))
    // flatten [[], [], ...] to []
    .reduce((a, b) => a.concat(b), [])
    // convert array of files to Object of {chunkName: chunkPath}
    .reduce((a, currentEntryPath) => {
      const chunkName = currentEntryPath
        // remove extension from chunkname
        .replace(path.extname(currentEntryPath), '')
        // remove root path from chunkname
        .replace(config.entryPaths.root, '');
      return Object.assign({}, a, {
        [chunkName]: currentEntryPath
      });
    }, {}),

  // options related to how webpack emits results
  output: {
    // the filename template for entry chunks
    filename: '[name].js',

    // the target directory for all output files
    // must be an absolute path (thus the `path.resolve`)
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  // options for resolving module requests
  resolve: {

    // directories where to look for modules
    modules: [
      'node_modules',
      path.join(__dirname, '.'),
      path.resolve(__dirname, 'src'),
    ],
  },

  plugins: [
    // The CommonsChunkPlugin is an opt-in feature that creates a separate file
    // (known as a chunk), consisting of common modules shared between multiple
    // entry points. By separating common modules from bundles, the resulting
    // chunked file can be loaded once initially, and stored in cache for later
    // use. This results in pagespeed optimizations as the browser can quickly
    // serve the shared code from cache, rather than being forced to load a
    // larger bundle whenever a new page is visited.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'layouts/default/vendor',
      filename: 'layouts/default/vendor.js',
    }),

  // Production-Only Plugins
  // (they get concatenated only if we're building for production)
  // See: https://webpack.js.org/guides/production-build/#the-manual-way-configuring-webpack-for-multiple-environments
  ].concat(config.isProd ? [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
  ] : []),
});
