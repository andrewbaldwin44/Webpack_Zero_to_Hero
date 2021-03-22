const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",

  entry: "./src/index.js",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.s?css$/i,

        use: ["style-loader", "css-loader", "sass-loader"]
      },
      { test: /\.ts$/, use: "ts-loader" },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource"
      }
    ]
  },

  resolve: {
    extensions: [".js", ".ts"]
  },

  devServer: {
    contentBase: "./dist",
    port: "3000"
  }
};
