/* eslint-disable */
const gulp = require('gulp')
const sass = require('gulp-sass')
const livereload = require('gulp-livereload')
// const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const { src } = require('gulp')
livereload({ start: true })

// exports.default = defaultTask

exports.default = function () {
  return gulp
    .src('./sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
}

/* IMAGE compression */
var SRC = './js/*.js'
var DEST = 'dist'

gulp.task('compress-images', function () {
  return gulp
    .src('pre-images/*')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('images'))
})

/* SASS live */
gulp.task('scss', function () {
  gulp.src('scss/*').pipe(scss()).pipe(gulp.dest('css')).pipe(livereload())
})

/* LIVE RELOAD */
gulp.task('watch', function () {
  livereload.listen()
  gulp.watch('scss', ['scss'])
})

/* MINIFY files */
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

function copyHtml() {
  return src('src/*.html').pipe(gulp.dest('dist'))
}
