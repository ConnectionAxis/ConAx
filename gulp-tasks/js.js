const gulp = require('gulp');
const compiler = require('webpack');
const webpack = require('webpack-stream');
const { paths } = require('./config');

const jsTask = () => (
  gulp.src(paths.js)
    .pipe(webpack(require('../webpack.config.js'), compiler))
    .pipe(gulp.dest(paths.dest))
);

module.exports = jsTask;
