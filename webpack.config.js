const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    filename: 'js/[name]-[hash].js',
    chunkFilename: "[id].chunk.js",
    // chunkFilename: (pathData) => {
    //   return pathData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js';
    // },
    // chunkLoading: 'async-node',
  },
  devServer: {
    hot: true,
    port: 9000,
    open: true,
  },
  module: {
    rules: [
      // 配置 babel-loader (第一步)
      {
        test: /\.m?js$/,
        // 排除 node_modules 與 bower_components 底下資料 (第二步)
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [{
          //將js字串生成為 style節點
          loader: 'style-loader',
        }, {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false,
          },
        }, {
          //將 css轉化成 CommonJS 模塊
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  "autoprefixer",
                ],
              ],
            },
          }
        }, {
          //將 Sass 編譯成 CSS
          loader: 'sass-loader',
          options: {
            // `dart-sass` 是首选
            implementation: require("sass"),
            sassOptions: {
              fiber: false,
            },
          },
        }]
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'//這邊以上是新增
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    ignored: /node_modules/,
  },
};
