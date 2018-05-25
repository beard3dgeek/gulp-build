'use strict'

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const maps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

// concat scripts
gulp.task("concatScripts", () => {
    return gulp.src(['js/**/*.js'])
    .pipe(maps.init())
    .pipe(concat('all.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('scripts'));
});

gulp.task('minifyScript', ['concatScripts'], () => {
    return gulp.src('scripts/all.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('scripts'));
});

gulp.task('compileSass', () => {
    return gulp.src('sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task('scripts',['minifyScript'],() => {
    return gulp.src(['scripts/all.min.js','scripts/all.js.map'])
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles',['compileSass'],() => {
    return gulp.src(['css/global.css','css/global.css.map'])
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('images', () => {
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'))
});


// minify to all.min.js -> moves file to dist/scripts