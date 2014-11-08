var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {
    return browserify({
        entries: ['./lib/index.js']
    }).bundle()
    .pipe(source('football-panel.js'))
    .pipe(gulp.dest('./dist'))
})
