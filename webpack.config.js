const path = require("path");

module.exports = {
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
      { test: /\.ts$/, use: "ts-loader" }
    ]
  },

  resolve: {
    extensions: [".js", ".ts"]
  }
};
