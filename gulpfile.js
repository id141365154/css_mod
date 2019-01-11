var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	fileinclude = require('gulp-file-include');

var reload = browserSync.reload;

gulp.task('browserSync', function () {
	browserSync.init({
		proxy: "http://renault-promo:8888/",
		files: ["**/*.php"]
	});
});

gulp.task('sass', function () {
	return gulp.src('assets/scss/**/*.scss')
		.pipe(sass()).on('error', sass.logError)
		.pipe(rename({
			suffix: '',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('css'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('headersass', function () {

	return gulp.src('assets/scss/header.scss')
		.pipe(sass()).on('error', sass.logError)
		.pipe(rename({
			suffix: '.min',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('css'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('js', function () {
	return gulp.src([

			'assets/js/jquery.arcticmodal-0.3.min.js',
			'assets/js/jquery.bxslider.js',
			'assets/js/main.js'
		])
		//	.pipe(uglify())
		.pipe(concat('main.min.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('js'))
		.pipe(reload({
			stream: true
		}));
});



gulp.task('watch', ['sass', 'js'], function () {
	gulp.watch('assets/scss/header.scss', ['headersass']);
	gulp.watch('assets/scss/**/*.scss', ['sass']);
	gulp.watch('assets/js/**/*.js', ['js']);
});

gulp.task('default', ['watch']);