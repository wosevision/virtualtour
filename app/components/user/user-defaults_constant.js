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

