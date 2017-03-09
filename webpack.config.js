import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';

module.exports = {
  devtool: 'source-map',
  entry: {},
  module: {
    noParse: [
      /node_modules\/aframe\/dist\/aframe(-master)*.js/, // for aframe from NPM
      /node_modules\/cannon\/build\/cannon.js/, // for aframe-extras from NPM
    ],
    loaders: [
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate-loader!babel-loader' },
			{ test: /\.html$/, loader: 'raw-loader' },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'file-loader' }
      // { test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/, loader: 'file-loader?name=[name].[ext]' } 
    ]
  },
  plugins: [

    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      // filename: 'index.pug',
      // filetype: 'pug',
      inject: 'body',
	    title: 'UOIT Virtual Tour',
      hash: true
    }),
    // new HtmlWebpackPugPlugin(),

    // Automatically move all modules defined outside of application directory to
    // `vendor` bundle and place Webpack bootstrap into `manifest`
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    }),
	  new webpack.optimize.CommonsChunkPlugin({
	    name: "manifest",
	    minChunks: Infinity
	  }),
  ]
};
