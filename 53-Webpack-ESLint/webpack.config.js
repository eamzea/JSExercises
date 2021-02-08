const path = require('path');

module.exports = {
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 5000,
    publicPath: '/public/js/',
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules), (entrada.js), (salida.js)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules), (entrada.js), (salida.js)/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
    ],
  },
};
