const webpackCommonConfig = require('./webpack.common');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(webpackCommonConfig, {
	mode: 'production',
	output: {
		filename: '[name][contenthash].js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [new MiniCssExtractPlugin({
		filename: '[name][contenthash].css'
	})]
});