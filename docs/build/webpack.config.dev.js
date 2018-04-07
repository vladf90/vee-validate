module.exports = {
  mode: 'development',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /.styl$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  }
};
