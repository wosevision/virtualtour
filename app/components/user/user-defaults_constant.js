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
  		labels: ['Less', 'More']
  	},
  	preloading: {
  		val: 0,
  		min: 0,
  		max: 3,
  		step: 1,
  		label: 'Preloading strategy',
  		labels: ['None', 'Proactive']
  	},
  	cache: {
  		val: 0,
  		min: 0,
  		max: 250,
  		step: 25,
  		label: 'Cache control',
  		labels: ['No cache', '250MB']
  	}
  }
};

export default {
  name: 'USER_DEFAULTS',
  fn: USER_DEFAULTS
};
