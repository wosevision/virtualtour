// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
// OfflinePluginRuntime.install({
//   onUpdating: () => {
//     console.log('SW Event:', 'onUpdating');
//   },
//   onUpdateReady: () => {
//     console.log('SW Event:', 'onUpdateReady');
//     // Tells to new SW to take control immediately
//     OfflinePluginRuntime.applyUpdate();
//   },
//   onUpdated: () => {
//     console.log('SW Event:', 'onUpdated');
//     // Reload the webpage to load into the new version
//     window.location.reload();
//   },
//   onUpdateFailed: () => {
//     console.log('SW Event:', 'onUpdateFailed');
//   }
// });

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angulartics from 'angulartics';
import angularticsGa from 'angulartics-google-analytics';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';
import cfpLoadingBar from 'angular-loading-bar';
import vAccordion from 'v-accordion';

import Common from './common/common';
import Components from './components/components';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { AppRun } from './app.run';

import './app.scss';

/**
 * Disables all `console.x()` calls for production by replacing
 * their methods with `angular.noop`.
 */
// {
//  const CONSOLE_METHODS = [
//      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
//      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
//      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
//      'timeStamp', 'trace', 'warn'
//    ],
//    CONSOLE_OBJ = (window.console = window.console || {});
//  let method,
//      length = CONSOLE_METHODS.length;
//  while (length--) {
//      method = CONSOLE_METHODS[length];
//      CONSOLE_OBJ[method] = angular.noop;
//  }
// }

angular.module('app', [
  uiRouter,
  angulartics,
  angularticsGa,
  ngAnimate,
  ngAria,
  ngMaterial,
  ngMdIcons,
  cfpLoadingBar,
  vAccordion,
  Common,
  Components,
  ...(window.REQUIRED_MODULES || [])
])

.component('app', AppComponent)

.config(AppConfig)

.run(AppRun);
