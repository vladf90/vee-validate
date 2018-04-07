const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['assets'], {
      root: path.join(__dirname, '/../')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
        NODE_ENV: JSON.stringify('production')
      },
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  }
};
