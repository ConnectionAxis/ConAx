const gulp = require('gulp');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const { paths, IS_PROD } = require('./config');

const imagesTask = () => (
  gulp.src(paths.images, { since: gulp.lastRun('images') })
    .pipe(gulpIf(IS_PROD, imagemin()))
    .pipe(gulp.dest(paths.destImages))
);

module.exports = imagesTask;
