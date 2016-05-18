import _ from 'lodash';
import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';

import 'ng-lodash';
import 'angular-ui-router';
import 'angular-ui-tree';
import 'angular-aria';
import 'angular-animate';
import 'angular-resource';
import 'angular-material';
import 'angular-material-icons';
//import '../../node_modules/ng-prettyjson/dist/ng-prettyjson.min.js';

//aframe
import 'aframe';

import './templates';
import './filters';
import './controllers';
import './services';
import './directives';

// create and bootstrap application
const requires = [
  //'ngPrettyJson',
  'ngLodash',
  'ui.router',
  'ui.tree',
  'ngAnimate',
  'ngResource',
  'ngMaterial',
  'ngMdIcons',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app')
  .constant('GlobalSettings', constants)
  .constant('_', _);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
