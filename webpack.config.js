var webpack = require('webpack');
var path = require('path');

var precss  = require('precss');
var cssnext = require('postcss-cssnext');
var vars    = require('postcss-simple-vars');
var nested  = require('postcss-nested');
var mixins  = require('postcss-mixins');
var rand    = require('postcss-random');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var appContext = path.join(__dirname, '/js');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
  context: appContext,
  entry: [
    './index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/'
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./bundle.js",
    publicPath: "/"
  },
  resolve: {
    modulesDirectories: [__dirname + '/node_modules'],
    root: __dirname + '/js'
  },
  resolveLoader: {
    root: __dirname + '/node_modules'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: path.join(__dirname, '/js')
    }, {
      test: /\.css?$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    }, { 
      test: /\.tmpl$/, 
      loader: "underscore-template-loader" 
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("./[name].css", { allChunks: true })
  ],
  postcss: function () {
    return [precss, cssnext, vars, nested, mixins, rand];
  }
};
