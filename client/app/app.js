import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install({
  onUpdating: () => {
    console.log('SW Event:', 'onUpdating');
  },
  onUpdateReady: () => {
    console.log('SW Event:', 'onUpdateReady');
    // Tells to new SW to take control immediately
    OfflinePluginRuntime.applyUpdate();
  },
  onUpdated: () => {
    console.log('SW Event:', 'onUpdated');
    // Reload the webpage to load into the new version
    window.location.reload();
  },

  onUpdateFailed: () => {
    console.log('SW Event:', 'onUpdateFailed');
  }
});

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

import AppComponent from './app.component';

/**
 * Disables all `console.x()` calls for production by replacing
 * their methods with `angular.noop`.
 */
// {
// 	const CONSOLE_METHODS = [
// 			'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
// 			'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
// 			'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
// 			'timeStamp', 'trace', 'warn'
// 		],
// 		CONSOLE_OBJ = (window.console = window.console || {});
// 	let method,
// 			length = CONSOLE_METHODS.length;
// 	while (length--) {
// 	    method = CONSOLE_METHODS[length];
// 	    CONSOLE_OBJ[method] = angular.noop;
// 	}
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

.config(($provide, $locationProvider, $stateProvider, $urlRouterProvider, $mdGestureProvider, $mdThemingProvider, cfpLoadingBarProvider) => { //, $mdIconProvider
  'ngInject';
  
  // cfpLoadingBarProvider.includeSpinner = false;
  // cfpLoadingBarProvider.latencyThreshold = 300;
  cfpLoadingBarProvider.spinnerTemplate = `<div id="loading-spinner" class="loading-spinner-container" layout layout-fill layout-align="center center">
  	<md-progress-circular md-mode="indeterminate" class="md-primary">
  	</md-progress-circular>
  </div>`;

  // THIS IS VERY IMPORTANT, ngMaterial's clickjacking behaviour
  // tampers with the capture phase in a way that is incompatible
  // with A-Frame's mobile click capturing. It must be disabled
  // for in-scene clicks to work on mobile.
  $mdGestureProvider.skipClickHijack();

  $mdThemingProvider.definePalette('UOITprimary', {
    '50': '0086FC',
    '100': '45A1FA',
    '200': '74B8FB',
    '300': 'A2D0FD',
    '400': '0077CA',
    '500': '006BB8',
    '600': '005FA6',
    '700': '005495',
    '800': '004883',
    '900': '003C71',
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', 'A100'],
    'contrastLightColors': null    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('UOITprimary', {
      'default': '400',
      'hue-1': '300',
      'hue-2': '500',
      'hue-3': '900'
    })
    .accentPalette('grey');

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      template: '<ui-view></ui-view>'
    });

  $urlRouterProvider.otherwise('/');

	$provide.decorator('$exceptionHandler', ($log, $delegate, $injector) => {
		'ngInject';
    return (exception, cause) => {
	    const $rootScope = $injector.get('$rootScope');
	    if (!cause) cause = 'Application error';
	    $rootScope.$broadcast('handler:exception', { exception, cause });

	    // FOR "SOFTER" ERRORS:
      // $log.debug(exception, cause);
      
  		$delegate(exception, cause);
    };
  });
})

.run(($rootScope, $state, $compile, $mdUtil, $popupWindow, UserAuth, AUTH_EVENTS) => {
  'ngInject';

  $rootScope.$on('cfpLoadingBar:started', event => $mdUtil.nextTick( tick => $compile(
    angular.element(document.getElementById('loading-spinner'))
  )($rootScope)));
  /**
   * Report on exceptions. The `handler:exception` event is fired
   * anywhere an exception is caught, and if uncaught, the AppConfig
   * block also sends this event with special delegation.
   * 
   * @function $rootScope.$on
   * @memberof AppRun
   * @param  {String}   event    The event name
   * @param  {function} callback To execute on handler call
   */
  $rootScope.$on('handler:exception', (event, error) => {
    const locals = {
      type: error.cause,
      message: error.exception.message,
      suggest: [0, 2, 1]
    }
    return $popupWindow.warning({locals});
  });

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => { 
    // console.log('STATE CHANGE START', toState, toParams, fromState, fromParams, options);
    if (toState.data && toState.data.roles && !UserAuth.isAuthorized(toState.data.roles)) {
      event.preventDefault();
      if (UserAuth.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  });

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
    $rootScope.pageTitle = 'UOIT Virtual Tour';
    if ( toState.label ) {
      $rootScope.pageTitle += ' | ';
      $rootScope.pageTitle += toState.label;
    }
    // console.log('STATE CHANGE SUCCESS', toState, toParams, fromState, fromParams);
  });

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    console.log('STATE CHANGE ERROR: ', error, toState, toParams, fromState, fromParams);
    const locals = {
      type: 'Navigation issue!',
      message: error.message || error.msg || 'The view you requested hit a snag while loading.',
      suggest: [4, 3]
    }
    $popupWindow.error({locals});
  });

  $rootScope.$on('$stateNotFound', (event, unfoundState, fromState, fromParams) => { 
    const locals = {
      type: 'Page not found!',
      message: `The page associated with (${unfoundState.to} : ${unfoundState.toParams}) cannot be located.`,
      suggest: [3]
    }
    $popupWindow.error({locals});
    console.log('STATE NOT FOUND', unfoundState, fromState, fromParams);
  });

  console.log('starting auth init...')
  UserAuth.initAuth().then(user => {
    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user);
    console.log('auth init complete!')
  });
});
