const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		main: './js/main.js',
		// vendor: []
	},
	output: {
		filename: './js/[name].bundle.js',
		path: path.resolve(__dirname, './dist/'),
		publicPath: '/',
	},
	devServer: {
		contentBase: path.resolve(__dirname, './')
	},
	devtool: 'source-map',
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons',
			filename: './js/commons.js',
			minChunks: 2,
		}),
	],
	module: {
		rules: [
			{	
				test: /\.(svg|jpg)$/,
				use: 'url-loader'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
	          		fallbackLoader: 'style-loader',
	          		loader: 'css-loader?importLoaders=1!postcss-loader!sass-loader'
		        })
			}
		]
	},
	plugins: [
	    new ExtractTextPlugin({
	    	filename: 'css/[name].bundle.css',
	    }),
	    new BrowserSyncPlugin({
	        host: 'localhost',
	        port: 3000,	
	        server: { 
	        	baseDir: './' 
	        }
        })
  	]
}