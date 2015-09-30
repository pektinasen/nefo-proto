'use strict'

var gulp = require('gulp');

var changed = require('gulp-changed'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
    jshint = require ('gulp-jshint'),
    kss = require('gulp-kss'),
    minify = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task('default', function () {
  //nothing here yet
  console.log(gulp);
});

gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js/'));
})