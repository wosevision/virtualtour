import webpack from 'webpack';
import path    from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

import { config, toEJS }  from './webpack.config';

config.output = {
  filename: '[name].[chunkhash].js',
  publicPath: '',
  // path: path.resolve(__dirname, 'dist')
  path: path.resolve(__dirname, '../virtualtour-ks/public')
};

config.module.rules = config.module.rules.concat([
	{ test: /\.(scss|sass)$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader'}) },
	{ test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'postcss-loader!css-loader'}) }
]);

config.plugins = config.plugins.concat([
   
  new webpack.LoaderOptionsPlugin({ options: { postcss: [ require('autoprefixer') ] } }),

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
	 * Exempts certain global variables from mangling – necessary for
	 * certain vendor dependencies (like Angular and A-Frame).
   */
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require', 'angular', 'AFRAME']
    }
  }),

  /**
   * Injects bundles in your index.html instead of wiring all manually.
   * It also adds hash to all injected assets so we don't have problems
   * with cache purging during deployment.
   */
  new HtmlWebpackPlugin({
    template: 'client/index.ejs',
    filename: '../templates/views/index.ejs',
    title: 'UOIT Virtual Tour',
    googleAnalytics: {
      trackingId: 'UA-89097401-1'
    },
    auth: true,
    inject: false,
    hash: true,
    toEJS
  })
]);

module.exports = config;
