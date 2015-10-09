'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass'),
    kss = require('gulp-kss'),
    Eyeglass = require('eyeglass').Eyeglass,
    exec = require('child_process').exec;

var eyeglass = new Eyeglass({
    includePaths: require('node-bourbon').includePaths,
    importer: function(uri, prev, done) {
        done(sass.compiler.types.NULL);
    }
});

// Disable import once with gulp until we
// figure out how to make them work together.
eyeglass.enableImportOnce = false

// define tasks here
gulp.task('sass', function(){
    gulp.src("./src/sass/**/*.scss")
        .pipe(sass(eyeglass.sassOptions()).
            on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('kss', function(cb){
    exec('npm run kss', function (err, stdout, stderr) {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('kss:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass', 'kss']);
});

//gulp.task('default', function () {
//  //nothing here yet
//  console.log(gulp);
//});
//
//gulp.task('scripts', function() {
//  return gulp.src('./src/js/!*.js')
//    .pipe(concat('app.js'))
//    .pipe(gulp.dest('./dist/js/'))
//    .pipe(uglify())
//    .pipe(rename({
//      suffix: '.min'
//    }))
//    .pipe(gulp.dest('./dist/js/'));
//})*/
