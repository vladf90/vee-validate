const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');


// eslint-disable-next-line
const page = (name) => {
  return new HtmlWebpackPlugin({
    inject: true,
    template: `src/templates/${name}.pug`,
    filename: `../${name}.html`
  });
};

const isProduction = process.env.NODE_ENV === 'production';

let config = {
  entry: path.join(__dirname, '/../', 'src/js/main'),
  output: {
    path: path.join(__dirname, '/../', 'assets'),
    filename: 'js/[name]-[hash].js',
    publicPath: '/assets/'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    page('index'),
    page('api'),
    page('examples'),
    page('validation'),
    page('localization'),
    page('advanced'),
    page('configuration')
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|locale)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ['syntax-dynamic-import', '@babel/plugin-proposal-object-rest-spread'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    browsers: ['last 2 versions', 'safari >= 7']
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.woff(2)?(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to <template lang="pug"> in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['pug-loader']
          }
        ]
      }
    ]
  }
};

config = merge(
  config,
  isProduction ? require('./webpack.config.prod.js') : require('./webpack.config.dev.js')
);

module.exports = config;
