const webpack = require('webpack');
const path    = require('path');
const config  = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

config.output = {
  filename: '[name].[chunkhash].js',
  publicPath: '',
  // path: path.resolve(__dirname, 'dist')
  path: path.resolve(__dirname, '../virtualtour-ks/public')
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
   * Auto-generates favicon, MS tile, Apple touch icon, Twitter card image, etc.
   */
  new FaviconsWebpackPlugin({
  	logo: path.resolve(__dirname, 'client/favicon.png'),
    background: '#fff',
    title: 'UOIT Virtual Tour',
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      favicons: true,
      firefox: true,
      twitter: true,
      windows: true
    }
  }),

  /**
   * Copies static assets from `client/assets` to the server's `public`
   * directory (keeps directory structure from `/assets` inwards).
   */
  new CopyWebpackPlugin([{
  	from: 'assets/**/*',
  	context: 'client'
  }]),

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
