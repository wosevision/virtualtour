import angular from 'angular';

// import io from 'socket.io-client';
// window.io = io;
// import JSONEditor from 'jsoneditor';
// window.JSONEditor = JSONEditor;

// angular modules
import 'angular-ui-router';
import 'angular-animate';
import 'angular-resource';
import 'angular-aria';
import 'angular-sanitize';
import 'angular-material';
import 'angular-material-icons';
import 'angular-cookies';
import 'angular-storage';
import 'angular-resizable';
import 'angular-loading-bar';
// import 'angular-socket-io';
import 'angulartics';
import 'angulartics-google-analytics';
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
  'ui.router',
  'ngAnimate',
  'ngResource',
  'ngAria',
  'ngSanitize',
  'ngMaterial',
  'ngMdIcons',
  'ngCookies',
  'angular-storage',
  'angularResizable',
  'angular-loading-bar',
  'angulartics',
  'angulartics.google.analytics',
  'ngMap',
  'ngWig',
  'nzTour',
  'vAccordion',
  'campusMap',
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
