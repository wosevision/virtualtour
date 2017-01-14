/**
 * This constant holds the user preference default 
 * values. It is used by the `UserSession` service
 * as a base layer for configurable preferences.
 * 
 * These values are assigned to every user
 * session and their `val` properties are overwritten
 * by custom preferences.
 * 
 * Only values described here will be considered by
 * the app as available to the end user for configuration.
 * 
 * @type {Object}
 * @prop {Boolean} val   Default value of the setting
 * @prop {String}  label Descriptive label for input
 * @prop {String}  icon  Icon ID for input
 * @prop {Array}   icons Array of exactly two icon IDs
 */
const USER_DEFAULTS = {
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
};

export default {
  name: 'USER_DEFAULTS',
  fn: USER_DEFAULTS
};