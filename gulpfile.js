/* eslint-disable */
var gulp = require('gulp')
var sass = require('gulp-sass')
livereload = require('gulp-livereload')
livereload({ start: true })
uglify = require('gulp-uglify')

exports.default = defaultTask

exports.default = function () {
  return gulp
    .src('./sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
}

// Sass Live
gulp.task('sass', function () {
  gulp.src('sass').pipe(sass()).pipe(gulp.dest('css')).pipe(livereload())
})

// LiveReload
gulp.task('watch', function () {
  livereload.listen()
  gulp.watch('sass', ['sass'])
})

// Minification of files
gulp.task('js', function () {
  return gulp
    .src('js/*.js')
    .pipe(eslint())
    .pipe(eslint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'))
})

/* gulp.task('minify', function () {
   gulp.src('js/app.js').pipe(uglify()).pipe(gulp.dest('build'));
}); */
