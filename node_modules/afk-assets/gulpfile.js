var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var deploy = require('gulp-gh-pages');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var cssimport = require('postcss-import');
var customProperties = require('postcss-custom-properties');
var hwb = require('postcss-color-hwb');
var color = require('color');
var customMedia = require('postcss-custom-media');

gulp.task('styles', function () {
    var processors = [
        cssimport(),
        hwb(),
        customMedia(),
        customProperties(),
        autoprefixer({ browsers: ['last 2 versions'] })
    ];

    return gulp.src(['css/main.css', 'css/frontpage-only.css'])
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('deploy', function () {
    return gulp.src('./www/**/*')
    .pipe(deploy());
});

gulp.task('default', function() {
    browserSync({
        server: {
            baseDir: './www'
        }
    });

    gulp.watch(['www/**/*'], reload);
    gulp.watch(['css/**/*'], ['styles']);
    gulp.watch(['dist/**/*'], function() {
        gulp.src('dist/**/*').pipe(gulp.dest('www'));
    })

});

gulp.task('color', function() {
    console.log(color('rgb(221, 25, 29)').hwb());
    console.log(color('rgb(176, 18, 10)').hwb());
});
