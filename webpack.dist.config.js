var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

config.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: path.resolve(__dirname, 'dist')
};

config.module.loaders = config.module.loaders.concat([
	{ test: /\.(scss|sass)$/, loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader!sass-loader') },
	{ test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'postcss-loader!css-loader') }
]);

config.postcss = () => [
	require('autoprefixer')
];

config.plugins = config.plugins.concat([

	/**
	 * Provides an exit pipe and injectable file reference for the final
	 * bundle of CSS assets.
	 */
  new ExtractTextPlugin('[name].[contenthash].css'),

  /**
   * Strips final CSS bundle of extraneous code, such as duplicate chunks
   * from `@import`ing a file twice, comment blocks, redeclarations, etc.
   */
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/
  }),

  /**
   * Reduces JS bundle's total size by minifying and mangling.
   */
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
    	/**
    	 * Exempts certain global variables from mangling – necessary for
    	 * certain vendor dependencies (like Angular and A-Frame).
    	 * @type {Array}
    	 */
      except: ['$super', '$', 'exports', 'require', 'angular', 'AFRAME']
    }
  })
]);

module.exports = config;
