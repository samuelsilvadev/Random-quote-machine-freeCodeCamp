'use strict';

const
    runSequence = require('run-sequence'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    imageMin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    clean = require('gulp-clean'),
    autoprefixer = require('gulp-autoprefixer');

const _inputFilesScss = './src/sass/**/*.scss';
const _outputFilesCss = './dist/css/';
const _outputFilesFonts = './dist/fonts';

const _inputFilesJs = './src/js/**/*.js';
const _outputFilesJs = './dist/js/';

const _inputImages = './src/imgs/*';
const _outputImages = './dist/imgs/';

gulp.task('sass', () => {
    return gulp
        .src(_inputFilesScss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(_outputFilesCss))
        .pipe(browserSync.stream());
});

gulp.task('prefixe', gulp.series((done) => {
    gulp.src(`${_outputFilesCss}/**/*.css`)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(_outputFilesCss));
    done();
}));

gulp.task('imagemin', gulp.series((done) => {
    gulp.src(_inputImages)
        .pipe(imageMin())
        .pipe(gulp.dest(_outputImages))
    done();
}));

gulp.task('browserify', () => {
    return browserify('./src/js/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(_outputFilesJs));
});

gulp.task('babel', gulp.series((done) => {
    gulp.src(`${_outputFilesJs}/*.js`)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest(_outputFilesJs))
    done();
}));

gulp.task('compress', (cb) => {
    pump([
        gulp.src(`${_outputFilesJs}/*.js`),
        uglify(),
        gulp.dest(_outputFilesJs)
    ],
        cb
    );
});

gulp.task('clean', () => {
    return gulp.src(`./dist/*`, { read: false })
        .pipe(clean());
});

gulp.task('build:prod', () => {
    runSequence('clean', 'browserify', 'babel', 'compress', 'imagemin', 'copy-fonts', () => { });
});

gulp.task('build:dev', () => {
    runSequence('clean', 'browserify', 'imagemin', 'copy-fonts', () => { });
});

gulp.task('copy-fonts', gulp.series((done) => {
    gulp.src('node_modules/font-awesome/fonts/**')
        .pipe(gulp.dest(_outputFilesFonts));

    gulp.src('node_modules/font-awesome/css/**')
        .pipe(gulp.dest(_outputFilesCss));

    done();
}));

gulp.task('serve', gulp.series(['sass', 'copy-fonts', 'browserify', 'imagemin'], () => {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(_inputFilesScss, gulp.series('sass'));
    gulp.watch(_inputFilesJs, gulp.series('browserify'));
    gulp.watch('*.html').on('change', browserSync.reload);
}));
