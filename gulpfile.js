'use strict';

let gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	sass = require('gulp-sass');
	// svgstore = require('gulp-svgstore'),
	// svgmin = require('gulp-svgmin'),
	// autoprefixer = require('gulp-autoprefixer'),
  // rename = require('gulp-rename');
 
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: 'index.html'
    }));
});

gulp.task('prod', function() {
   return gulp.src('/sass/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer({
    	browsers: ['> 5%', 'last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('sass', function () {
  return gulp.src('sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('css/*.css', ['sass']);
});

gulp.task('sass:watch', function () {
  gulp.watch('**/**', ['sass']);
});

// gulp.task('sprite', function () {
//   return gulp.src('./src/assets/*.svg')
//     .pipe(svgmin())
//     .pipe(svgstore())
//     .pipe(gulp.dest('./src/assets/'));
// });

gulp.task('prefix', function () {
	return gulp.src('css/styles.css')
		.pipe(autoprefixer({
    	browsers: ['> 5%', 'last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('sprite', function () {
  return gulp.src(['img/*.svg'])
    .pipe(svgmin())
    .pipe(rename({ prefix: 'i-' }))
    .pipe(svgstore())
    .pipe(gulp.dest('img'));
});