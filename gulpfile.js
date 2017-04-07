var gulp = require('gulp'), // core 
	sass = require('gulp-sass'), // compile sass
	cleanCss = require('gulp-clean-css'), // minify css
	concat = require('gulp-concat'), // concat file
	uglify = require('gulp-uglify'), // minify js
	pump = require('pump'), // handle error pas compile biar ga stop si gulp nya
	webserver = require('gulp-webserver'), // running server
	autoprefix = require('gulp-autoprefixer'), // autoprefix for css
	notify = require('gulp-notify'); //notify

// source CSS
var sourceCss = [
	'bower_components/bootstrap/dist/css/bootstrap.css',
	'bower_components/slick-carousel/slick/slick.css'
];

//sorce JS
var sourceJs = [
	'bower_components/jquery/dist/jquery.js',
	'bower_components/bootstrap/dist/js/bootstrap.js',
	'bower_components/slick-carousel/slick/slick.js'	
];

//for mix source css to main.css
gulp.task('mix:css',function(){
	return gulp.src(sourceCss)
		.pipe(concat('main.css'))
		.pipe(cleanCss())
		.pipe(gulp.dest('assets/css'))
		.pipe(notify('Stylesheets merged!'));
});

//for mix source JS to main.js
gulp.task('mix:js',function(){
	return gulp.src(sourceJs)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js'))
		.pipe(notify('Scripts merged!'));
});

gulp.task('sass',function(bebas){ // pump berfungsi jika syntax ada yang salah gulpnya berhenti
	pump([
		gulp.src('assets/sass/*.scss'),  // ambil smua file scss
		sass(),
		autoprefix(),
		cleanCss(),
		gulp.dest('assets/css')
	],bebas);
});

gulp.task('scripts',function(bebas){
	pump([
		gulp.src('assets/scripts/*.js'),
		concat('app.js'),
		uglify(),
		gulp.dest('assets/js')
	],bebas);
});

gulp.task('watch',function(){
	gulp.watch('assets/sass/*.scss',['sass']);  // watch perubahan file si sass
	gulp.watch('assets/scripts/*.js',['scripts']);
});

gulp.task('server',function(){
	gulp.src('.')
	.pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      port: 9000,
      host: 'localhost'
	}));
});

gulp.task('serve:dev',['server','watch']);

gulp.task('default',['mix:css','mix:js','sass','scripts','serve:dev']); // buat ngerun default task cukup ketik gulp