var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');

gulp.task('sass', function() {
  return sass('./app/css/scss/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/css'))
    .pipe(connect.reload());
});


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
    gulp.watch('./app/css/**/*.scss', ['sass']);
    gulp.watch('./app/js/*.js', ['js']);
    gulp.watch('./app/*.html', ['html']);
});


gulp.task('serve', ['watch', 'connect'], function() {

});
