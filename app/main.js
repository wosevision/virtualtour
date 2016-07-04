import angular from 'angular';

// angular modules
import 'angular-ui-router';
// import 'angular-ui-tree';
import 'angular-animate';
import 'angular-aria';
import 'angular-cookies';
import 'angular-loading-bar';
import 'angular-material';
import 'angular-material-icons';
import 'angular-resource';
import 'angular-storage';
//import '../../node_modules/ng-prettyjson/dist/ng-prettyjson.min.js';

// aframe modules
import 'aframe';
import 'aframe-drag-look-controls-component';
import 'aframe-selectable-component';
import 'aframe-mouse-cursor-component';
import extras from 'aframe-extras';
extras.registerAll(); //.controls

// app modules
import config  from './components/app_config';
import run     from './components/app_run';
import './components/app_templates';
import './components';

// list required modules for DI
const requires = [
  //'ngPrettyJson',
  'ui.router',
  //'ui.tree',
  'ngAnimate',
  'angular-loading-bar',
  'angular-storage',
  'ngCookies',
  'ngResource',
  'ngMaterial',
  'ngMdIcons',
  'app.templates',
  'app.components'
];

// mount on window for testing
window.app = angular.module('app', requires);
angular.module('app').config(config);
angular.module('app').run(run);
angular.bootstrap(document, ['app'], {
  strictDi: true
});
