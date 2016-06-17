'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var del = require('del');
var connect = require('connect');
var serveStatic = require('serve-static');

var isEnvironment = function (type) {
    return gutil.env.type === type;
};

var isEnvironmentProduction = true; //isEnvironment('production');

var staticPath = './public';
var serverPort = isEnvironmentProduction ? 80 : 3000;

var paths = {
    js: {
        input: './source/js/**/*.js',
        output: './public/assets/javascript'
    },
    sass: {
        input: './source/sass/**/*.scss',
        output: './public/assets/stylesheets'
    }
};

gulp.task('default', ['serve']);

gulp.task('clean', ['clean:js', 'clean:sass']);

gulp.task('clean:js', function () {
    return del(paths.js.output);
});

gulp.task('clean:sass', function () {
    return del(paths.sass.output);
});

gulp.task('build', ['build:js', 'build:sass']);

gulp.task('build:js', ['clean:js', 'jshint'], function () {
    return gulp.src(paths.js.input)
        .pipe(sourcemaps.init())
        .pipe(isEnvironmentProduction ? concat('bundle.js') : gutil.noop())
        .pipe(isEnvironmentProduction ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.output));
});

gulp.task('jshint', function () {
    return gulp.src(paths.js.input)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build:sass', ['clean:sass'], function () {
    return gulp.src(paths.sass.input)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: isEnvironmentProduction ? 'compressed' : 'nested'})).on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.sass.output));
});

gulp.task('watch', function () {
    gulp.watch(paths.js.input, ['build:js']);
    gulp.watch(paths.sass.input, ['build:sass']);
});

gulp.task('serve', ['build', 'watch'], function () {
    return connect()
        .use(serveStatic(staticPath))
        .listen(serverPort);
});
