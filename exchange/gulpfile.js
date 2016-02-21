
 
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	 reload      = browserSync.reload, 
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	less = require('gulp-less'),
	path = require('path'),
	preprocess = require('gulp-preprocess'),
	connect = require('gulp-connect-php'),
	compass = require('gulp-compass'),
	uncss = require('gulp-uncss'),
	replace = require('gulp-replace'),
	removeHtmlComments = require('gulp-remove-html-comments'),
	plumber = require('gulp-plumber'),
	notify           = require('gulp-notify'),
	path             = require('path'),
	rename           = require('gulp-rename'),
	minifycss        = require('gulp-minify-css'),
	changedInPlace = require('gulp-changed-in-place'),
	sourcemaps = require('gulp-sourcemaps'),
	inlineCss = require('gulp-inline-css')

	;
	

	var browserSync_server = './';
	var rootAddress = '';
	
	// gulp replace
	var replaceSource = rootAddress  + '/*.php';
	var replaceDest = rootAddress  + 'build';

	//the title and icon that will be used for the Grunt notifications
	
	var notifyInfo = {
		title: 'Gulp'
		
	};
	//icon: path.join(__dirname, 'gulp.png')

	//error notification settings for plumber
	var plumberErrorHandler = { errorHandler: notify.onError({
			title: notifyInfo.title,
			
			message: "Error: <%= error.message %>"
		})
	};
	//icon: notifyInfo.icon,

	gulp.task('templates', function(){
	  gulp.src([ replaceSource ])
	    .pipe(replace(
	    '<h2>ASK THE DOCTOR</h2>\n<p>From big-picture solutions to daily.</p>\n<a href="" class="btn btn-default">Submit Your Question</a>',
	    '<h2>DRGVG AESTHETIC</h2> <p>Trust your face and body to the Specialists.</p> <a href="" class="btn btn-default">Submit Your Question</a>'
	    ))
	    .pipe(gulp.dest( replaceDest ));
	});


	// delete build folder
	gulp.task('clean:build', function (cb) {
	  del([
	    './build/'
	    // if we don't want to clean any file we can use negate pattern
	    //'!dist/mobile/deploy.json'
	  ], cb);
	});


	gulp.task('copy_resources', function(){
		gulp.src([
		    '*css/**/*',
		    '*js/**/*',
		    '*font-awesome/**/*',
		    '*fonts/**/*',
		    '*images/**/*',
		    '*.html*'
		    
		])
		.pipe(gulp.dest('build/'));'use strict';
	});

	gulp.task('remove-hml-comments', function () {
	  return gulp.src('*.html')
	    .pipe(removeHtmlComments())
	    .pipe(gulp.dest('build/'));
	});

	// uncss
	//var uncssHtmlSource = ['./uncss/index.html', 'posts/**/*.html', 'http://example.com']
	//var uncssHtmlSource = ['./email.html','./landing-page.html' ] // this is nor woking
	gulp.task('uncss', function () {
    gulp.src('./css/app.css')
        .pipe(uncss({
            html: [ './email.html' ]
        }))
        .pipe(gulp.dest('./uncss/css'));
         // copy html files to un css
         //gulp.src('./*.html')
         //.pipe(gulp.dest('./uncss/'));
	});

	
	// minify CSS
	var cssminSource = rootAddress  + 'css/style.css';
	var cssminDest =  rootAddress + 'css';
 
	gulp.task('minifycss', function() {
	  gulp.src( cssminSource )
	    .pipe($.rename({suffix: '.min'}))
	    .pipe($.minifycss({keepBreaks:true}))
	    .pipe(gulp.dest( cssminDest )) ;
	});


	var config_rb = rootAddress  + 'config.rb';
	var compassSource = rootAddress  + 'sass/*.scss';
	var compassDest = rootAddress  + 'css';
	var sassFolder = rootAddress  + 'sass';
	var tmpassets = rootAddress  + 'compass_temp_assets';

	gulp.task('compass', function() {
  	gulp.src( compassSource )
	  	.pipe(plumber(plumberErrorHandler))
	    .pipe(compass({
		      config_file: config_rb,
		      sourcemap: true,
		      css: compassDest ,
		      sass: sassFolder
	      
	 	}))
	 	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	 	.pipe(gulp.dest( compassDest ))
	 	.pipe(rename({ suffix: '.min' }))
	  	.pipe(minifycss())
	  	.pipe(gulp.dest( compassDest ))
	  	.pipe(reload({stream:true}))
	  	.pipe(notify({
	      message: 'Styles task complete'
	    }))
	    ;
	  	
	});
	//.pipe(browserSync.stream({match: '**/*.css'}));

	
	



	var htmlSource = rootAddress  + 'html/*.html';
	var htmlDest =  rootAddress;

	gulp.task('html', function() {
	  return  gulp.src( htmlSource )
	  	.pipe(changedInPlace())
	  	.pipe(preprocess())
	    .pipe(gulp.dest( htmlDest ))
	});

	
	var sassSource = 'sass/*.scss';
	var sassDest = 'css';
	//Type: String Default: nested Values: nested, expanded, compact, compressed
	gulp.task('sass', function () {
	  gulp.src( sassSource )
	  	.pipe(plumber(plumberErrorHandler))
	  	.pipe(sourcemaps.init())
	    .pipe(sass({outputStyle: 'expanded'}))
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest( sassDest ))
	   	.pipe(reload({stream:true}))
	    .pipe(notify({
	      message: 'Styles task complete'
	    }));
	    
	});

	

	var lessSource = rootAddress  + 'less/style.less';
	var lessDest = rootAddress  + 'css';
		
		gulp.task('less', function () {
		  gulp.src( lessSource )
		  	.pipe(less())
		    .pipe(gulp.dest(lessDest));
		});



	// Js concat
	var concatSource = ['./js/vendor/**/*.js']
	gulp.task('concat', function() {
	  return gulp.src( concatSource )
	    .pipe(concat('app.js'))
	    .pipe(gulp.dest('./js'));
	});
	
	
	// Js minify concat
	gulp.task('compress', function() {
	  return gulp.src( concatSource )
	    .pipe(concat('app.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('./js'));
	});
	
	
	// browser sync
	// server: {
	// 		baseDir: base_Dir,
	// 		index: 'index.html'
	// 	},

	var syncOpts = {
		open: false,
		notify: true
	};

	gulp.task('browserSync', function() {
		 browserSync.init({
		 	injectChanges: true,
        	server: {
		            baseDir: browserSync_server
		        }
		    });
	});
	 
	// autoprefixer
	var sourceCss = './css/style.css';
	gulp.task('prefix', function () {
	    return gulp.src( sourceCss )
	        .pipe(autoprefixer({
	            browsers: ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
	            cascade: false
	        }))
	        .pipe(gulp.dest('css'));
		});

	//php server
	var phpWatch = '**/*.php';
	gulp.task('php-server', function() {
		  
		  connect.server({}, function (){
			    browserSync({
			      proxy: '127.0.0.1:8000',
			      keepalive: true,
			      open: false,
			      base: 'public'
			    });
		  });

		  gulp.watch( phpWatch ).on('change', function () {
		    browserSync.reload();
		  });
	 
	});


	// inline
	// gulp.src('./*.html')
	gulp.task('inline', function() {
    return gulp.src('./uncss/email.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('inline/'));
	});


	// serve task
	gulp.task('serve', ['browserSync' , 'sass', "html" ,  ], function() {

		// sass changes
		gulp.watch( [ rootAddress  + 'sass/**/*.scss' ], browserSync.reload );
		// html changes
		gulp.watch( [ rootAddress  +  'html/*.html' ], browserSync.reload );

	});

	// serve task
	gulp.task('default', [ 'browserSync', 'compass', "html" ], function() {

		// sass changes
		gulp.watch( [ rootAddress  + 'sass/**/*.scss' ] , ['compass' ] );
		// html changes
		gulp.watch( [  rootAddress  +  'html/*.html' ] ,  ['html' , browserSync.reload] );

	});

	// Less watch
	gulp.task('less:watch', ['less'], function() {

		// sass changes
		gulp.watch( rootAddress  + 'less/**/*.less', ['less', browserSync.reload]);
		// html changes
		

	});


	// html watch
	gulp.task('html:watch', ['html'], function() {

		// sass changes
		//gulp.watch([ rootAddress  +  'less/**/*.less'], ['less', browserSync.reload]);
		// sass changes
		gulp.watch([ rootAddress  +  'html/*.html'], ['html']  );

	});


	// php watch
	gulp.task('php:watch', ['less', 'connect-sync'], function() {

		// sass changes
		gulp.watch(['./less/**/*.less'], ['less', browserSync.reload]);
		// sass changes
		gulp.watch(['./*.php'], [browserSync.reload]);

	});
	// build
	gulp.task('build', ['copy_resources', 'remove-hml-comments']);