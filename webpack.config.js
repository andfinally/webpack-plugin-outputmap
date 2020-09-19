const { resolve } = require('path');
const OutputMapPlugin = require('./outputmap-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		'blocks/index': resolve(__dirname, 'src/blocks/index.js'),
		'blocks/validation': resolve(__dirname, 'src/blocks/validation.js'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
		],
	},
	output: {
		path: resolve(__dirname, 'dist'),
		filename: '[name].[contentHash].min.js',
	},
	plugins: [new OutputMapPlugin(), new CleanWebpackPlugin()],
	mode: 'production',
};
