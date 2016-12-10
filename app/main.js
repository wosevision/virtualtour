import angular from 'angular';

// import io from 'socket.io-client';
// window.io = io;
// import JSONEditor from 'jsoneditor';
// window.JSONEditor = JSONEditor;

// angular modules
import 'angular-ui-router';
import 'angular-animate';
import 'angular-aria';
import 'angular-cookies';
import 'angular-resizable';
import 'angular-loading-bar';
import 'angular-material';
import 'angular-material-icons';
import 'angular-resource';
import 'angular-sanitize';
import 'angular-storage';
// import 'angular-socket-io';
import 'angular-breadcrumb';
import 'ngmap';
import 'ng-wig';
import 'nz-tour';
import 'v-accordion';
import 'uoit-campus-map';

// aframe modules
import 'aframe';
import 'aframe-event-set-component';
import 'aframe-reverse-look-controls-component';
import 'aframe-look-at-component';
// import 'aframe-selectable-component';
import 'aframe-text-component';
import 'aframe-mouse-cursor-component';
// import {controls} from 'aframe-extras';
// controls.registerAll();

// app modules
import config  from './components/app_config';
import run     from './components/app_run';
import './components/app_templates';
import './components/index';

// list required modules for DI
const requires = [
  // 'btford.socket-io',
  'campusMap',
  'nzTour',
  'ncy-angular-breadcrumb',
  'ui.router',
  'ngAria',
  'ngSanitize',
  'ngAnimate',
  'vAccordion',
  'angularResizable',
  'angular-loading-bar',
  'angular-storage',
  'ngCookies',
  'ngResource',
  'ngMaterial',
  'ngMdIcons',
  'ngMap',
  'ngWig',
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
