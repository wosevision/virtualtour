'use strict';
import gulp from 'gulp';
import gulpDocumentation from 'gulp-documentation';

gulp.task('docs', function () {
  return gulp.src('./app/components/**/*.js')
    .pipe(gulpDocumentation('html'))
    .pipe(gulp.dest('docs'));
});