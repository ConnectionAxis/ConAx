const gulp = require('gulp');
const pug = require('gulp-pug');
const pugIncludeGlob = require('pug-include-glob');
const { paths } = require('./config');

const pugTask = () => (
  gulp.src(paths.pug)
    .pipe(pug({
      basedir: paths.src,
      plugins: [pugIncludeGlob()],
    }))
    .pipe(gulp.dest(paths.dest))
);

module.exports = pugTask;
