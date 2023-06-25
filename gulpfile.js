const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssmin = require('gulp-minify-css')
gulp.task('sass', async function () {
  return gulp
    .src('packages/theme/index.scss')
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'))
})
