import webpack from 'webpack';
import path    from 'path';
import { config, toEJS }  from './webpack.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CheckerPlugin } from 'awesome-typescript-loader';

config.output = {
  filename: '[name].bundle.js',
  publicPath: '/',
  path: path.resolve(__dirname, 'client')
};

config.module.rules = config.module.rules.concat([
	{ test: /\.(scss|sass)$/, loader: 'style-loader!css-loader!sass-loader?sourceMap' },
	{ test: /\.css$/, loader: 'style-loader!css-loader' }
]);

config.plugins = config.plugins.concat([

  // Injects bundles in your index.html instead of wiring all manually.
  // It also adds hash to all injected assets so we don't have problems
  // with cache purging during deployment.
  new HtmlWebpackPlugin({
    template: 'client/index.ejs',
    title: '*dev* UOIT Virtual Tour',
    googleAnalytics: {
      trackingId: 'UA-89097401-1'
    },
    inject: false,
    hash: true,
    toEJS
  }),

  // Adds webpack HMR support. It acts like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
  new webpack.HotModuleReplacementPlugin(),

 //  new BundleAnalyzerPlugin({
	//   analyzerMode: 'static',
	//   reportFilename: 'bundle-report.html'
	// }),
	  
  new CheckerPlugin(),
	
]);

module.exports = config;
