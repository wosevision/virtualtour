import path from 'path';
import webpack from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';

const babelOptions = {
  presets: [['es2015', { modules: false }], 'es2016'],
  plugins: ['syntax-dynamic-import']
};

exports.config = {
  devtool: 'source-map',
  entry: {},
  module: {
    noParse: [
      /node_modules\/aframe\/dist\/aframe(-master)*.js/, // for aframe from NPM
      /node_modules\/cannon\/build\/cannon.js/, // for aframe-extras from NPM
    ],
   	rules: [
			{ test: /\.json$/, loader: 'json-loader' },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'ng-annotate-loader'
				},{
					loader: 'babel-loader',
	        options: babelOptions
				}]
			},{
	      test: /\.ts$/,
	      exclude: /node_modules/,
	      use: [
		      {
						loader: 'ng-annotate-loader'
					},
	        {
	          loader: 'awesome-typescript-loader',
	          options: {
	          	useBabel: true,
	          	useCache: true,
	          	babelOptions
			      }
	        }
        ]
	    },
			// { test: /\.html$/, loader: 'raw-loader' },
			{
		    test: /\.html$/,
		    use: [{
		      loader: 'html-loader',
		      options: {
		        minimize: true,
		        exportAsEs6Default: true
		      }
		    }],
		  },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'file-loader' }
      // { test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/, loader: 'file-loader?name=[name].[ext]' } 
    ]
  },
  plugins: [
    // Automatically move all modules defined outside of application directory to
    // `vendor` bundle for easy caching of static assets
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    }),
    // Provide a leftover file for Webpack to store its manifest boilerplate, which
    // should rarely ever change and therefore can be cached aggressively
	  new webpack.optimize.CommonsChunkPlugin({
	    name: "manifest",
	    minChunks: Infinity
	  }),
	  
	  new CheckerPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
};

exports.toEJS = (string, print) => `<%${ (print && '=') || '' } ${ string } %>`;
