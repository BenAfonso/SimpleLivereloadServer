var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

gulp.task('sass', function() {
  return sass('./app/styles/scss/*.scss', { style: 'expanded' })
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/styles'))
    .pipe(connect.reload());
});


gulp.task('build-css', function() {
  return gulp.src('./app/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('build-html', function() {
    return gulp.src('./app/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('build-js', function() {
    return gulp.src('./app/js/*.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['build-html','build-css','build-js']);

gulp.task('connect', function() {
    connect.server({
        port: 8080,
        root: ['app'],
        livereload: true
    });
});


gulp.task('js', function() {
  return gulp.src('./app/js/*.js')
    .pipe(jshint.reporter('default'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src('./app/*.html')
    .pipe(connect.reload());
});



gulp.task('watch', function() {
    gulp.watch('./app/styles/**/*.scss', ['sass']);
    gulp.watch('./app/js/*.js', ['js']);
    gulp.watch('./app/*.html', ['html']);
});


gulp.task('serve', ['sass','watch', 'connect'], function() {

});
