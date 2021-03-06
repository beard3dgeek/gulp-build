'use strict'

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const maps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const del = require('del');
const gulpSequence = require('gulp-sequence')
const browserSync = require('browser-sync').create();

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

gulp.task('minifyCss', ['compileSass'], () => {
    return gulp.src('css/global.css')
    .pipe(cleanCSS())
    .pipe(rename('global.min.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('scripts',['minifyScript'],() => {
    return gulp.src(['scripts/all.min.js','scripts/all.js.map'])
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles',['minifyCss'],() => {
    return gulp.src(['css/global.min.css','css/global.css.map'])
    .pipe(gulp.dest('dist/styles'))
    .on("end", browserSync.reload);
});


gulp.task('images', () => {
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'))
});

gulp.task('moveFiles', () => {
    return gulp.src(['index.html','icons/*'],{ base: "./" })
    .pipe(gulp.dest('dist'));
})

gulp.task('clean', () => {
    return del(['dist', 'css', 'scripts']);
});

gulp.task('build', gulpSequence('clean',['styles','scripts','images'],'moveFiles'));

gulp.task("default", ["build"], () => {
    gulp.start('serve');
});


gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("sass/**", ['styles']);
    gulp.watch("index.html").on('change', browserSync.reload);
});