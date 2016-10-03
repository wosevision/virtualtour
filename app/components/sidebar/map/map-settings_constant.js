const MAP_SETTINGS = {
	type: 'ROADMAP',
	styles: [{
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "poi.school",
    "elementType": "geometry",
    "stylers": [{
      "color": "#ededed"
    }]
  }, {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [{
      "color": "#0077ca"
    }]
  }]
}

export default {
	name: 'MAP_SETTINGS',
	fn: MAP_SETTINGS
};