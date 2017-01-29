const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		main: './src/js/main.js'
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/dist/',
		filename: 'js/[name].js'
	},
	module: {
		loaders: [
			{	
				test: /\.(svg|jpg)$/,
				loader: 'url'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css!postcss!sass')
			}
		]	
	},
	plugins: [
		new ExtractTextPlugin('css/main.css')
	],	
	watch: true,
	devtool: '#source-map'
}