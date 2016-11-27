'use strict';

import config        from '../config';
import gulp          from 'gulp';
import merge         from 'merge-stream';
import templateCache from 'gulp-angular-templatecache';


const TEMPLATE_HEADER = 'angular.module(\'<%= module %>\'<%= standalone %>).run([\'$templateCache\', function($templateCache) {';
const TEMPLATE_BODY = '$templateCache.put(\'<%= url %>\',\'<%= contents %>\');';

// Views task
gulp.task('views', function() {

  // Put our index.html in the dist folder
  // const indexFile = gulp.src(config.views.index)
  //   .pipe(gulp.dest(config.buildDir));

  // Process any other view files from app/views
  const views = gulp.src(config.views.src)
    .pipe(templateCache({
      standalone: true,
      filename: 'app_templates.js',
      module: 'app.templates',
      moduleSystem: 'ES6',
      templateHeader: TEMPLATE_HEADER,
      templateBody: TEMPLATE_BODY
    }))
    .pipe(gulp.dest(config.views.dest));

  return views; //merge(indexFile, views);

});
