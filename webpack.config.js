const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const PROFILER = process.env.PROFILER === "true";
const PRODUCTION = process.env.PRODUCTION === "true";
const SERVER_RENDER = process.env.SERVER_RENDER === "true";

function getInterpolationString({ onServerRender, onDevRender }) {
  if (SERVER_RENDER) {
    return onServerRender;
  }
  return onDevRender;
}

const plugins = [
  new HtmlWebpackPlugin({
    template: "src/index.html",
    html: getInterpolationString({
      onServerRender: "<%- html %>",
      onDevRender: ""
    }),
    initialState: getInterpolationString({
      onServerRender: "<%- initialState %>",
      onDevRender: ""
    })
  }),
  new webpack.DefinePlugin({
    "process.env.CLIENT": true
  })
];

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
      filename: "[name].[contenthash].css"
    })
  );
}

module.exports = {
  mode: PRODUCTION ? "production" : "development",
  devtool: PRODUCTION ? "source-map" : "eval-cheap-module-source-map",

  entry: { index: "./src/index.js" },

  output: {
    filename: "assets/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
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
      {
        test: /\.(js|ts|tsx?)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
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

  optimization: {
    moduleIds: "deterministic",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },

  resolve: {
    extensions: [".js", ".ts"]
  },

  devServer: {
    contentBase: "./dist",
    port: "3000"
  }
};
