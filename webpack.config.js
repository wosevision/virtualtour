import path from 'path';
import webpack from 'webpack';

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
	  })
  ]
};
