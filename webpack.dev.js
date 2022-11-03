const webpackCommonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(webpackCommonConfig, {
	mode: 'development',
	output: {
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
				exclude: /node_modules/
			}
		]
	},
	watch: true
});