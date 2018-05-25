'use strict'

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const maps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

// concat scripts
gulp.task("concatScripts", () => {
    return gulp.src(['js/**/*.js'])
    .pipe(maps.init())
    .pipe(concat('all.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task('minifyScript', ['concatScripts'], () => {
    return gulp.src('js/all.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('compileSass', () => {
    return gulp.src('scss/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task('scripts',['minifyScript'],() => {
    return gulp.src(['js/all.min.js','js/all.js.map'])
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles',['compileSass'],() => {
    return gulp.src(['css/global.css','css/global.css.map'])
    .pipe(gulp.dest('dist/styles'));
});


// minify to all.min.js -> moves file to dist/scripts