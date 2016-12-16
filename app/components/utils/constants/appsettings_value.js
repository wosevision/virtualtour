const APP_SETTINGS = {
	USER: {
    _TOOLBAR_OPEN: {
      val: true,
      label: 'Toolbar open by default',
      icon: 'last_page'
    },
    _TOOLBAR_CONDENSED: {
      val: false,
      label: 'Toolbar condensed by default',
      icon: 'flip_to_back'
    },
    _SHOW_TOOLTIPS: {
      val: true,
      label: 'Show hint messages',
      icon: 'announcement'
    },
    _SHOW_WELCOME: {
      val: true,
      label: 'Always show welcome',
      icon: 'live_tv'
    }
  },
  DATA: {
  	_COMPRESSION: {
  		val: 1,
  		min: 1,
  		max: 5,
  		step: 1,
  		label: 'Compression level',
  		labels: ['Less', 'More']
  	},
  	_PRELOADING: {
  		val: 0,
  		min: 0,
  		max: 3,
  		step: 1,
  		label: 'Preloading strategy',
  		labels: ['None', 'Proactive']
  	},
  	_CACHING: {
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
  name: 'APP_SETTINGS',
  fn: APP_SETTINGS
};

