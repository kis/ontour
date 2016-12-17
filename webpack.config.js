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
    alias: {
      // "mapbox": path.resolve(__dirname, "./lib/mapbox"),
      // "cluster": path.resolve(__dirname, "./lib/leaflet.markercluster"),
      "jquery": path.resolve(__dirname, "./lib/jquery.min"),
      "backbone.wreqr": path.resolve(__dirname, "./lib/backbone.wreqr.min"),
      "backbone.babysitter": path.resolve(__dirname, "./lib/backbone.babysitter.min"),
      "backbone": path.resolve(__dirname, "./lib/backbone-min"),
      "marionette": path.resolve(__dirname, "./lib/backbone.marionette.min")
    }
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
    new ExtractTextPlugin("./[name].css", { allChunks: true }),
    new webpack.ProvidePlugin({
      $ : "jquery",
      Backbone : "backbone",
      _ : "underscore"
    })
  ],
  postcss: function () {
    return [precss, cssnext, vars, nested, mixins, rand];
  }
};
