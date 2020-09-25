/* eslint-disable */
var gulp = require('gulp');
var sass = require('gulp-sass');

exports.default = defaultTask;

exports.default = function () {
  return gulp
    .src('./sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
};
