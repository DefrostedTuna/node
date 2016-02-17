/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),

    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    lost = require('lost');

gulp.task('js', function(){
    return gulp.src([ 'resources/assets/js/uptilt/awesome-form.js',
        'resources/assets/js/uptilt/modal.js',
        'resources/assets/js/uptilt/fitvids.js',
        //This is the project specific files go
        'resources/assets/js/landing/app.js',
        'resources/assets/js/landing/lodestoneApi.js',
        'resources/assets/js/landing/timeago.js',
        'resources/assets/js/landing/_parseCharacter.js',
        'resources/assets/js/landing/_parseReddit.js',
        'resources/assets/js/landing/_onLoad.js',])
        .pipe(concat('_concat.js'))
        .pipe(gulp.dest('resources/assets/js/temp'))
        .pipe(rename('compiled.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('styles', function() {
    return gulp.src([ 'resources/assets/sass/app.sass'])
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
                lost(),
                autoprefixer()
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('resources/assets/sass/*.sass', ['styles']);
    gulp.watch('resources/assets/js/*.js', ['js']);
    gulp.watch('resources/assets/js/*/*.js', ['js']);
});
