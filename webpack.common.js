const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        "public",
      ],
      options: {
        concurrency: 100,
      },
    }),
    // new BundleAnalyzerPlugin(),
    // new webpack.IgnorePlugin({
    //   resourceRegExp: /^\.\/locale$/,
    //   contextRegExp: /moment$/,
    // }),
    // new MomentLocalesPlugin({
    //   localesToKeep: ['en-in'],
    // }),
    new PreloadWebpackPlugin({
        rel: 'preload',
        as(entry) {
          if (/\.css$/.test(entry)) return 'style';
          if (/\.woff2$/.test(entry)) return 'font';
        },
        include: 'allAssets',
        fileWhitelist: [/\.(woff2|)(\?.*)?$/i, /\.(css|)(\?.*)?$/i],
        fileBlacklist: [/\assets/]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader",],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name(module) {
    //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    //         return `npm.${packageName.replace('@', '')}`;
    //       },
    //     },
    //   },
    // },
  },
};