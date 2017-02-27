const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('[name].bundle.css')

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js',
    bootstrap: './bootstrap.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [
      '.'
    ],
    alias: {
      jquery: "node_modules/jquery/dist/jquery.js",
      bootstrap: "node_modules/bootstrap/dist"
    }
  },
  module: {
    rules: [{
      test: /\.(png|jpg)$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000
        } // Convert images < 10k to base64 strings
      }]
    }, {
      test: /\.scss$/,
      loader: extractCSS.extract(['css-loader', 'sass-loader'])
    }, {
      test: /\.css$/,
      loader: extractCSS.extract(['css-loader', 'sass-loader'])
    }, {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }]
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.NamedModulesPlugin(),
    extractCSS
  ]
}

module.exports = config