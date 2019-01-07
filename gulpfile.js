const gulp = require('gulp');

require('browser-sync').create('dev');

gulp.task('clean', require('./gulp-tasks/clean'));
gulp.task('pug', require('./gulp-tasks/pug'));
gulp.task('css', require('./gulp-tasks/css'));
gulp.task('js', require('./gulp-tasks/js'));
gulp.task('images', require('./gulp-tasks/images'));

gulp.task('build', gulp.series('clean', gulp.parallel('pug', 'css', 'js', 'images')));
gulp.task('serve', gulp.series('build', require('./gulp-tasks/serve')));