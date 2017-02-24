var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config');

config.output = {
  filename: '[name].bundle.js',
  publicPath: '/',
  path: path.resolve(__dirname, 'client')
};

config.module.loaders = config.module.loaders.concat([
	{ test: /\.(scss|sass)$/, loader: 'style-loader!css-loader!sass-loader?sourceMap' },
	{ test: /\.css$/, loader: 'style-loader!css-loader' }
]);

config.plugins = config.plugins.concat([

  // Adds webpack HMR support. It acts like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
