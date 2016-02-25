var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
// get browserify and vinyl
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('connect', function () {
    connect.server({
        root: 'public',
        port: 4000
    });
});

gulp.task('browserify', function () {
    // get app.js
    return browserify('./app/app.js')
        // bundle and create main.js
        .bundle()
        .pipe(source('main.js'))
        // save it to public/js dir
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.js', ['browserify']);
    // watch for sass changes
    gulp.watch('sass/style.sass', ['sass']);
});

gulp.task('sass', function () {
    return sass('sass/style.sass')
        .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['connect', 'watch']);
