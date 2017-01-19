import * as angular from 'angular';

// import io from 'socket.io-client';
// window.io = io;
// import JSONEditor from 'jsoneditor';
// window.JSONEditor = JSONEditor;

// angular modules
import 'angular-ui-router';
import '../node_modules/angular-ui-router/commonjs/ng1/legacy/stateEvents'; // temporary: deprecated feature
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
import 'angular-cbuffer';
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
import { primitives } from 'aframe-extras';
primitives.registerAll();

// app modules
import config  from './components/app_config';
import run     from './components/app_run';
import './components/app_templates';
import './components/index';

// list required modules for DI
const requires = [
  // 'btford.socket-io',
  'ui.router',
  'ui.router.state.events', // temporary: deprecated feature
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
	'cbuffer',
  'ngMap',
  'ngWig',
  'nzTour',
  'vAccordion',
  'campusMap',
  'app.templates',
  'app.components'
];

angular.module('app', requires);
angular.module('app').config(config);
angular.module('app').run(run);
angular.bootstrap(document, ['app'], {
  strictDi: true
});
