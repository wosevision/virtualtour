function MapCtrl(NgMap, BuildingResource) {
	'ngInject';
	let m = this;

	m._settings = {
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

	m.markers = BuildingResource.query();

	NgMap.getMap().then(instance => {
		Object.assign(m, instance);
		google.maps.event.trigger(m,'resize');
		console.log(m)
	});
}

export default {
	name: 'MapCtrl',
	fn: MapCtrl
};