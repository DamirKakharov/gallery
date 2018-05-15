var webpack = require('webpack');
var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
	},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", 
            "css-loader", 
            "sass-loader" 
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  performance: { hints: false }
};