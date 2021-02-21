'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	rigger = require('gulp-rigger'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('gulp-pngquant'),
	cache = require('gulp-cache'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	del = require('del');

gulp.task('html', function () {
	gulp.src('src/templates/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('src/'))
		.pipe(reload({stream: true}));
});


gulp.task('sass', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('src/css'))
        .pipe(reload({stream: true}));
});

gulp.task('sass-libs', function () {
    return gulp.src('src/scss/libs.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/css'))
        .pipe(reload({stream: true}));
});

gulp.task('script', function () {
    return gulp.src('src/js/main.js')
        .pipe(reload({stream: true}));
});

gulp.task('script-libs', function () {
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js',
		'src/libs/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        'src/libs/slick-slider/slick.min.js',
        'src/libs/typeahead/js/typeahead.js',
		'src/libs/jquery.easing/js/jquery.easing.js',
		'src/libs/bootstrap-sass-datepicker/js/bootstrap-sass-datepicker.js',
		'src/libs/fancybox/fancybox.js',
		'src/libs/inputmask/dist/min/jquery.inputmask.bundle.min.js'
	])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('src/js'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync'], function() {

	gulp.watch('src/templates/**/*.html', function (event, cb) {
		gulp.start(['html']);
	});

	gulp.watch('src/scss/libs.scss', function (event, cb) {
		gulp.start(['sass-libs']);
	});

    gulp.watch('src/scss/partials/**/*.scss', function (event, cb) {
        gulp.start(['sass']);
    });

    gulp.watch('src/scss/main.scss', function (event, cb) {
        gulp.start(['sass']);
    });

	gulp.watch('src/js/main.js', function (event, cb) {
		gulp.start(['script']);
	});

    gulp.watch('src/libs/**/*.js', function (event, cb) {
        gulp.start(['script-libs']);
    });
});

gulp.task('clean', function () {
	return del.sync('build');
});

gulp.task('img', function () {
	return gulp.src('src/img/**/*')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('build/img'));
});

gulp.task('build', ['clean', 'img'], function() {
	gulp.src('src/css/*.css')
        .pipe(cssnano())
		.pipe(gulp.dest('build/css'));

	gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('build/fonts'));

	gulp.src('src/js/*.js')
		.pipe(gulp.dest('build/js'));

	gulp.src('src/*.html')
		.pipe(gulp.dest('build'));
});

gulp.task('clear', function () {
	return cache.clearAll();
});

gulp.task('default', ['watch']);