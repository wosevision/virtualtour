class MapCtrl {
	constructor(NgMap, BuildingResource, MAP_SETTINGS) {
		'ngInject';
		this.BuildingResource = BuildingResource;
		this.settings = MAP_SETTINGS;
	  this.icon = {
	    url:'https://shared.uoit.ca/global/files/img/logos/UOIT_blue_shield.png',
	    scaledSize:[34,43],
	    origin: [0, 0],
	    anchor: [0,0]
	  }
		NgMap.getMap().then(instance => {
			this.mapInstance = instance;
			google.maps.event.trigger(instance,'resize');
		});
	}
  showInfo($event, marker) {
  	console.log($event, marker);
  }
}

export default {
	name: 'MapCtrl',
	fn: MapCtrl
};