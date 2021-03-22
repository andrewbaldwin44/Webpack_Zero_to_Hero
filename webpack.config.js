const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const PROFILER = process.env.PROFILER === "true";
const PRODUCTION = process.env.PRODUCTION === "true";

const plugins = [];

if (PROFILER) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: true,
      defaultSizes: "gzip",
      reportFilename: path.join(__dirname, "profiler/report.html")
    })
  );
}

if (PRODUCTION) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
  );
}

module.exports = {
  mode: PRODUCTION ? "production" : "development",
  devtool: PRODUCTION ? "source-map" : "eval-cheap-module-source-map",

  entry: "./src/index.js",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.s?css$/i,

        use: [
          {
            loader: PRODUCTION ? MiniCssExtractPlugin.loader : "style-loader"
          },
          "css-loader",
          "sass-loader"
        ]
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

  plugins,

  resolve: {
    extensions: [".js", ".ts"]
  },

  devServer: {
    contentBase: "./dist",
    port: "3000"
  }
};
