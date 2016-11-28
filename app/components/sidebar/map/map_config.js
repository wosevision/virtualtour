function MapConfig($stateProvider) {
  'ngInject'

	$stateProvider
    .state('map', {
      // url: 'map',
      parent: 'home',
      resolve: {
      	// markers(BuildingResource) {
      	// 	return BuildingResource.query();
      	// }
      	onGotoBldg($state) {
      		return () => data => $state.go('building', data); // alert(JSON.stringify(data));
      	}
      },
      component: 'campusMap',
		  ncyBreadcrumb: {
		  	label: 'Campus map'
		  }
    })
    .state('map.location', {
      url: '/:location',
      // views: {
      //   '@' : {
      //   	controller: 'MapCtrl',
      //   	controllerAs: 'map',
      //     templateUrl: 'sidebar/map/_map.html'
      //   }
      // },
      resolve: {
        currentLocation($stateParams, LocationResource) {
    			return LocationResource.query({ filter: {code: $stateParams.location } });
        },
      	markers(BuildingResource, currentLocation) {
      		return BuildingResource.query({ filter: { parent: currentLocation._id } });
      	}
      },
      component: 'campusMap',
		  ncyBreadcrumb: {
		  	label: 'Campus map'
		  }
    });
}

export default {
  name: 'MapConfig',
  fn: MapConfig
};