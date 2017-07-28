require('babel-register');

const path = require('path');

const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ssr = require('./src/ssr').default;

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      process: {},
      'process.env': {},
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new HtmlWebpackPlugin({
      template: '!!ejs-loader!' + path.resolve(__dirname, 'src/index.html'),
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      title: 'App Title',
      render: () => ssr()
    })
  ].concat(
    ENV === 'production'
      ? [
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
              warnings: false,
              pure_funcs: [
                'classCallCheck',
                '_possibleConstructorReturn',
                '_classCallCheck',
                'Object.freeze',
                'invariant',
                'warning'
              ]
            },
            output: { comments: false }
          })
        ]
      : []
  ),
  stats: 'verbose',
  node: {
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },
  devServer: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    publicPath: '/',
    quiet: true,
    clientLogLevel: 'error',
    compress: true,
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
    setup(app) {
      app.use('/content/**', (req, res) => {
        fs.createReadStream(`content/${req.params[0]}`).pipe(res);
      });
    }
  }
};
