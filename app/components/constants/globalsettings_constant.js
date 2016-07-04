const GlobalSettings = {
	APP: {
		_TITLE: 'UOIT Virtual Tour',
	  _API_URL: 'http://localhost:3000/api', //https://virtualtour-server.herokuapp.com
	  _MENU_VIEWS: {
	    location: {
	      label: 'By location',
	      icon: 'pin_drop',
	      desc: 'View a list of available tour locations',
	      show: false
	    },
	    map: {
	      label: 'By map',
	      icon: 'map',
	      desc: 'Explore locations from the UOIT Campus Map',
	      show: false
	    },
	    tour: {
	      label: 'Guided tour',
	      icon: 'rotate_90_degrees_ccw',
	      desc: 'Take a preset trip with a video tour guide',
	      show: false
	    },
	    playground: {
	      label: 'Playground',
	      icon: 'vidiogame_asset',
	      desc: 'Explore UOIT\'s latest web experiments in 3D',
	      show: false
	    },
	    settings: {
	      label: 'Settings',
	      icon: 'tune',
	      desc: 'Adjust the Virtual Tour experience',
	      show: false
	    }
	  }
	}
};

export default {
  name: 'GlobalSettings',
  fn: GlobalSettings
};

