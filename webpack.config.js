const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
<<<<<<< HEAD
const HtmlPlugin = require('html-webpack-plugin');
=======
>>>>>>> module1-task3

module.exports = {
  entry: './src/main.js',
  output: {
<<<<<<< HEAD
    filename: 'bundle.[contenthash].js',
=======
    filename: 'bundle.js',
>>>>>>> module1-task3
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
<<<<<<< HEAD
    new HtmlPlugin({
      template: 'public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
      },
    ]
  }
=======
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
>>>>>>> module1-task3
};
