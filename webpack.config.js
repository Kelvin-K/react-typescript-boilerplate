var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: "./src/renderer.ts",
	output: {
		filename: "renderer.js",
		path: path.resolve(__dirname, "build")
	},
	target: "web",
	resolve: {
		extensions: [".js", ".json", ".ts", ".tsx", ".scss"]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "source-map-loader",
				exclude: /node_modules/,
				enforce: "pre"
			},
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader", "import-glob-loader"]
			},
			{
				test: /\.svg$/,
				loader: "svg-url-loader"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html"
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/resources', to: 'resources' }
			]
		})
	],
	devServer: {
		historyApiFallback: true,
	}
};
