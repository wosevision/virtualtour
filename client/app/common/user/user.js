import angular from 'angular';
import uiRouter from 'angular-ui-router';

import userAuthFactory from './userAuth.factory';
import userResolverFactory from './userResolver.factory';
import userSessionService from './userSession.service';

let userModule = angular.module('user', [
  uiRouter
])

.factory('UserAuth', userAuthFactory)

.factory('UserResolver', userResolverFactory)

.service('UserSession', userSessionService)

.constant('USER_DEFAULTS', {
	settings: {
    toolbarOpen: {
      val: true,
      label: 'Toolbar open by default',
      icon: 'last_page'
    },
    toolbarCondensed: {
      val: false,
      label: 'Toolbar condensed by default',
      icon: 'flip_to_back'
    },
    showHints: {
      val: true,
      label: 'Show hint messages',
      icon: 'announcement'
    },
    showWelcome: {
      val: true,
      label: 'Always show welcome',
      icon: 'live_tv'
    }
  },
  usage: {
  	auto: {
  		val: true
  	},
  	compression: {
  		val: 1,
  		min: 1,
  		max: 5,
  		step: 1,
  		label: 'Compression level',
  		labels: ['Less', 'More'],
  		levels: {
  			// [imageQual, loadTime, dataUse] / 0=low, 10=high
  			'<= 2': [10, 5, 10],
  			'== 3': [5, 5, 5],
  			'>= 4': [0, 10, 0]
  		}
  	},
  	preloading: {
  		val: 0,
  		min: 0,
  		max: 2,
  		step: 1,
  		label: 'Preloading strategy',
  		labels: ['None', 'Proactive'],
  		levels: {
  			// [imageQual, loadTime, dataUse] / 0=low, 10=high
  			'== 0': [5, 10, 0], //no preload
  			'== 1': [5, 5, 5], //preload
  			'== 2': [5, 0, 5] //preload & keep last
  		}
  	},
  	// cache: {
  	// 	val: 0,
  	// 	min: 0,
  	// 	max: 250,
  	// 	step: 25,
  	// 	label: 'Cache control',
  	// 	labels: ['No cache', '250MB'],
  	// 	levels: [
  	// 	]
  	// },
  	resolution: {
  		val: 1,
  		min: 0,
  		max: 1,
  		step: 1,
  		label: 'Image resolution',
  		labels: ['Low', 'High'],
  		levels: {
  			// [imageQual, loadTime, dataUse] / 0=low, 10=high
  			'== 0': [0, 0, 0], //low-res
  			'== 1': [10, 5, 10], //high-res
  		}
  	}
  },
  profiles: {
  	conserve: {
  		auto: { val: true },
  		compression: { val: 5 },
  		preloading: { val: 0 },
  		resolution: { val: 0 }
  	},
  	balanced: {
  		auto: { val: true },
  		compression: { val: 3 },
  		preloading: { val: 1 },
  		resolution: { val: 1 }
  	},
  	mobile3g: {
  		auto: { val: true },
  		compression: { val: 4 },
  		preloading: { val: 1 },
  		resolution: { val: 0 }
  	},
  	mobileWifi: {
  		auto: { val: true },
  		compression: { val: 2 },
  		preloading: { val: 1 },
  		resolution: { val: 0 }
  	},
  	desktopSlow: {
  		auto: { val: true },
  		compression: { val: 5 },
  		preloading: { val: 2 },
  		resolution: { val: 1 }
  	},
  	desktopFast: {
  		auto: { val: true },
  		compression: { val: 1 },
  		preloading: { val: 2 },
  		resolution: { val: 1 }
  	}
  }
})

.constant('USER_ROLES', {
	admin: 'admin',
	editor: 'editor',
	contributor: 'contributor'
})

.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.name;

export default userModule;
