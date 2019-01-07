const { ENV, IS_DEV } = require('./gulp-tasks/config');

module.exports = {
  mode: ENV,
  ...IS_DEV && { devtool: 'source-map' },
  output: { filename: 'index.js' },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: { loader: 'babel-loader' },
    }],
  },
};
