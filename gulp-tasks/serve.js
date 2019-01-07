const browserSync = require('browser-sync').get('dev');
const gulp = require('gulp');
const { paths } = require('./config');

const serveTask = () => {
  browserSync.init({
    server: './dist',
  });

  gulp.watch(paths.pugGlob, gulp.task('pug'));
  gulp.watch(paths.cssGlob, gulp.task('css'));
  gulp.watch(paths.cssStyles, gulp.task('css'));
  gulp.watch(paths.jsGlob, gulp.task('js'));

  gulp.watch(paths.destHtml).on('change', browserSync.reload);
  gulp.watch(paths.destJs).on('change', browserSync.reload);
  gulp.watch(paths.destImages).on('change', browserSync.reload);
};

module.exports = serveTask;
