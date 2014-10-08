var gulp = require('gulp');

gulp.task('default', ['browserify'], function () {
    gulp.watch('./lib/**/*.js', ['browserify'])
});
