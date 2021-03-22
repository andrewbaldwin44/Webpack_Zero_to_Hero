const path = require("path");
const webpack = require("webpack");

const PRODUCTION = process.env.PRODUCTION === "true";

module.exports = {
  mode: PRODUCTION ? "production" : "development",
  devtool: "source-map",

  entry: "./src/server/server.js",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist", "server"),
    publicPath: ""
  },

  resolve: {
    extensions: [".js", ".ts"]
  },

  module: {
    rules: [
      {
        test: /\.(js|ts?)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },

  optimization: {
    minimize: false
  },

  externals: {
    express: "commonjs express"
  },

  externalsPresets: { node: true },
  target: "node"
};
