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

import './app.scss';

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
  
  // cfpLoadingBarProvider.latencyThreshold = 300;
  // cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.parentSelector = '#title-bar';

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
    url: ''
  })
	.state('location', {
		parent: 'home',
	  url: '/:location',
	  resolve: {
    	params: ['$transition$', ($transition$) => $transition$.params()],
	    currentLocation: ['params', '$tourApi', (params, $tourApi) => {
				return $tourApi.location.query({ 
					filter: {
						code: params.location 
					}
				}).$promise;
	    }],
	    sceneData: ['params', '$aframeScene', '$tourApi', 'currentLocation', (params, $aframeScene, $tourApi, currentLocation) => {
	  		if (currentLocation[0] && currentLocation[0].default) {
					return $tourApi.scene.get({ id: currentLocation[0].default })
						.$promise
						.then(scene => {
							if (!params.building) {
								$aframeScene.scene = scene
							}
						});
	  		}
	    }]
	  }
	})
  .state('building', {
    parent: 'location',
    url: '/:building',
    resolve: {
    	params: ['$transition$', ($transition$) => $transition$.params()],
	    currentBuilding: ['params', '$tourApi', (params, $tourApi) => {
				return $tourApi.building.query({ 
					filter: {
						code: params.building 
					}
				}).$promise;
	    }],
	    sceneData: ['params', '$aframeScene', '$tourApi', 'currentBuilding', (params, $aframeScene, $tourApi, currentBuilding) => {
	  		if (currentBuilding[0] && currentBuilding[0].default) {
					return $tourApi.scene.get({ id: currentBuilding[0].default })
						.$promise
						.then(scene => {
							if (!params.scene) {
								$aframeScene.scene = scene
							}
						});
	  		}
	    }]
    }
  })
  .state('scene', {
    parent: 'building',
    url: '/:scene',
    resolve: {
    	params: ['$transition$', ($transition$) => $transition$.params()],
	    currentScene: ['params', '$tourApi', 'currentBuilding', (params, $tourApi, currentBuilding) => {
				return $tourApi.scene.query({ 
					filter: {
						code: params.scene,
						parent: currentBuilding[0]._id
					}
				}).$promise;
	    }],
	    sceneData: ['params', '$aframeScene', '$tourApi', 'currentScene', (params, $aframeScene, $tourApi, currentScene) => {
	  		if (currentScene[0] && currentScene[0]._id) {
					return $tourApi.scene.get({ id: currentScene[0]._id })
						.$promise
						.then(scene => $aframeScene.scene = scene);
	  		}
	    }]
    }
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

.run(($rootScope, $state, $transitions, $compile, $mdUtil, $popupWindow, UserAuth, AUTH_EVENTS) => {
  'ngInject';

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

  $transitions.onStart({}, function(trans) {
    const Auth = trans.injector().get('UserAuth');
    let toState = trans.$to(),
    		fromState = trans.$from();
    console.log('[$transitions] onStart', trans, toState, fromState);

    if (toState.data && toState.data.roles && !Auth.isAuthorized(toState.data.roles)) {
	    if (auth.isAuthenticated()) {
	      $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
	    } else {
	      $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	    }
	  }
  });

  $state.defaultErrorHandler(error => {
    console.log('[$state] defaultErrorHandler', error);

    if (error.type !== 2) {
	    const locals = {
	      type: 'Navigation issue!',
	      message: error.message || error.msg || 'The view you requested hit a snag while loading.',
	      suggest: [4, 3]
	    }
	    $popupWindow.error({locals});
	  }
  });

  $state.onInvalid(error => {
    console.log('[$state] onInvalid', error);
    const locals = {
      type: 'Page not found!',
      message: `The page you were looking for could not be located.`,
      suggest: [3]
    }
    $popupWindow.error({locals});
  });

  $transitions.onError({}, function(trans) {
    const Popup = trans.injector().get('$popupWindow');
    const error = trans.error();
    console.log('[$transitions] onError', error);
    if (error.type !== 5 && error.type !== 2) {
      const locals = { message: `Navigation error!` }
      Popup.warning({locals});
    }
  });

  console.log('starting auth init...')
  UserAuth.initAuth().then(user => {
    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user);
    console.log('auth init complete!')
  });
});
