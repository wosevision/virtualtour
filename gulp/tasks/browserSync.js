'use strict';

import config      from '../config';
import url         from 'url';
import browserSync from 'browser-sync';
import babel       from 'gulp-babel';
import gulp        from 'gulp';
import Cache       from 'gulp-file-cache';
import nodemon     from 'gulp-nodemon';

const BROWSER_SYNC_RELOAD_DELAY = 500;
let cache = new Cache();

gulp.task('babelize', function () {
  var stream = gulp.src('./server') // your ES2015 code 
                   .pipe(cache.filter()) // remember files 
                   .pipe(babel({ presets: ['es2015'] })) // compile new ones 
                   .pipe(cache.cache()) // cache them 
                   .pipe(gulp.dest('./server/dist')); // write them 
  return stream; // important for gulp-nodemon to wait for completion 
})

gulp.task('nodemon', ['babelize'], function (cb) {
  let called = false;
  return nodemon({
    // nodemon our expressjs server
    script: './server',
    // watch core server file(s) that require server restart on change
    watch: ['./server'],
    tasks: ['babelize']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
   //  .on('readable', function() {
	  //   this.stdout.on('data', function(chunk) {
	  //     if(chunk) {
	  //       setTimeout(function() { browserSync.reload(); }, 500);
	  //     }
	  //     process.stdout.write(chunk);
	  //   });
	  //   this.stderr.pipe(process.stderr);
	  // });
});

gulp.task('browserSync', ['nodemon'], function() {

  const DEFAULT_FILE = 'index.html';
  const ASSET_EXTENSION_REGEX = new RegExp(`\\b(?!\\?)\\.(${config.assetExtensions.join('|')})\\b(?!\\.)`, 'i');

  browserSync.init({
  	proxy: config.serverProxy,
    // server: {
    //   baseDir: config.buildDir,
      middleware: function(req, res, next) {
        let fileHref = url.parse(req.url).href;

        if ( !ASSET_EXTENSION_REGEX.test(fileHref) ) {
          req.url = '/' + DEFAULT_FILE;
        }

        return next();
      },
    // },
  	port: config.browserPort,
  	ui: {
    	port: config.UIPort
    },
    ghostMode: false
  });

});
