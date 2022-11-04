const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: {
		bundle: path.resolve(__dirname, 'src/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		assetModuleFilename: '[name][ext]'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				},
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/i,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Contact - Book',
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/views/index.html')
		})
	]

};	

 