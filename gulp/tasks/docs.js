'use strict';

// **** NOTE: ****
// This task should be run using Node v4.3.2

import config from '../config';
import gulp from 'gulp';
import sia from 'sia';
import * as pkg from '../../package.json'

sia(gulp, {
  basePath: '../../',
  moduleTitle: 'UOIT Virtual Tour',
  modulePrefix: 'app',
  ngVersion: '1.5.8',
  moduleJs: [config.scripts.src],
  moduleCss: [config.styles.src],
  repositoryUrl: pkg.repository && pkg.repository.url.replace(/^git/, 'https').replace(/(\.git)?\/?$/,'')
});
