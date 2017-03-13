import webpack from 'webpack';
import path    from 'path';
import config  from './webpack.config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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

  // Injects bundles in your index.html instead of wiring all manually.
  // It also adds hash to all injected assets so we don't have problems
  // with cache purging during deployment.
  new HtmlWebpackPlugin({
    template: 'client/index.ejs',
    title: '*dev* UOIT Virtual Tour',
    inject: false,
    hash: true
  }),

  // Adds webpack HMR support. It acts like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;
