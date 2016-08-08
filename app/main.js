import angular from 'angular';

import io from 'socket.io-client';
window.io = io;
import JSONEditor from 'jsoneditor';
window.JSONEditor = JSONEditor;

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
import 'angular-socket-io';
import 'angular-breadcrumb';
import 'v-accordion';

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
  'btford.socket-io',
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
