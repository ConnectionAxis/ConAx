const browserSync = require('browser-sync').get('dev');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const { paths, IS_DEV, IS_PROD } = require('./config');

const plugins = [
  require('postcss-easy-import'),
  require('postcss-preset-env')({
    stage: false,
    features: {
      'custom-properties': true,
      'color-mod-function': true,
      'custom-media-queries': true,
    },
  }),
  require('css-mqpacker'),
];

if (IS_PROD) plugins.push(require('cssnano'));

const cssTask = () => (
  gulp.src(paths.css)
    .pipe(gulpIf(IS_DEV, sourcemaps.init()))
    .pipe(postcss(plugins))
    .pipe(concat('index.css'))
    .pipe(gulpIf(IS_DEV, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dest))
    .pipe(gulpIf(IS_DEV, browserSync.stream()))
);

module.exports = cssTask;
