module.exports = {
	entry: './src/js/main.js',
	output: {
		path: __dirname + '/dist',
		publicPath: '/dist/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{	
				test: /\.(svg|jpg)$/,
				loader: 'url'
			},
			{
				test: /\.css/,
				loaders: [ 'style', 'css' ]
			}
		]	
	}
}