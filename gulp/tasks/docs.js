'use strict';
import gulp from 'gulp';
import fs from 'fs';
import del from 'del';
import path from 'path';
import runSequence from 'run-sequence';
import gulpDocumentation from 'gulp-documentation';
import esdoc from 'gulp-esdoc';

import config from '../config';

gulp.task('cleandocs', () => del([config.docsDir]));

/**
 * Single page docs
 */
// gulp.task('docs', () => {
//   return gulp.src(path.join(config.componentsDir, '/**/*.js'))
//     .pipe(gulpDocumentation('html', {
//     	github: true
//     }, {
//       name: 'UOIT Virtual Tour',
//       version: '1.0.0'
//     }))
//     .pipe(gulp.dest('docs'));
// });

/**
 * Multi page docs
 */
// const getFolders = dir => fs.readdirSync(dir).filter(
// 	file => fs.statSync(path.join(dir, file)).isDirectory()
// );

// const folders = getFolders(config.componentsDir),
// 			tasks = [];

// folders.forEach(folder => {
// 	const taskName = `docs-${folder}`;
// 	gulp.task(taskName, () => gulp.src(path.join(config.componentsDir, folder, '/**/*.js'))
// 	  .pipe(gulpDocumentation('html', {
// 	  	github: true
// 	  }, {
// 	    name: 'UOIT Virtual Tour',
// 	    version: '1.0.0'
// 	  }))
// 	  .pipe(gulp.dest(path.join('docs', folder)))
//   );
// 	tasks.push(taskName);
// });

gulp.task('docs', ['cleandocs'], cb => {
  // runSequence(tasks, cb);

  // ESDOC
	return gulp.src(config.componentsDir).pipe(
		esdoc({
			title: 'UOIT Virtual Tour',
			destination: config.docsDir,
			includes: ['\\.(js|es6)$'], 'excludes': ['\\.spec\\.(js|es6)$'],
			'experimentalProposal': {
		    'classProperties': true,
		    'objectRestSpread': true,
		    'decorators': true,
		    'doExpressions': true,
		    'functionBind': true,
		    'asyncGenerators': true,
		    'exportExtensions': true,
		    'dynamicImport': true
		  }
		})
	);
});