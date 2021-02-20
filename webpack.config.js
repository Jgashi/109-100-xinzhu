const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;



module.exports = {
  devtool: 'source-map',
  mode: 'development',
  context: path.resolve(__dirname, "./src"),
  entry: {
    main: 'main',
    subsystem: 'subsystem',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'dist',
    filename: 'js/[name]-[fullhash].js',
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    stats: 'errors-only',
    compress: true,
    // port: 9000,
    open: true,
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/js/object'),
      path.resolve('src/scss'),
      path.resolve('src/images'),
      path.resolve('src/assets'),
      path.resolve('node_modules')
    ],
    extensions: ['.js']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vender: {
          test: /node_modules/,
          name: 'vender',
          chunks: 'initial',
          enforce: true,
        }
      }
    }
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
        include: path.resolve('.'),
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
                  "precss",
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
        }],
        include: path.resolve('src/scss'),
        exclude: path.resolve('./node_modules'),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'//這邊以上是新增
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name]-[fullhash].css',
    }),
    new LinkTypePlugin({
      '**/*.css' : 'text/css'
    }),
    new HtmlWebpackPlugin({
      title: '新竹後台入口網站',
      filename: 'index.html',
      template: 'html/portal.html',
      viewport: 'width=device-width, initial-scale=1.0',
      chunks: ['vender','main'],
    }),
    new HtmlWebpackPlugin({
      title: '新竹後台入口網站-子系統選單',
      filename: 'subsystem.html',
      template: 'html/subsystem.html',
      viewport: 'width=device-width, initial-scale=1.0',
      chunks: ['vender','subsystem'],
    }),
  ],
  // watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    ignored: /node_modules/,
  },
};
