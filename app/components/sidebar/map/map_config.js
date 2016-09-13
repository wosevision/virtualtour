function MapConfig($stateProvider) {
  'ngInject'

	$stateProvider
    .state('map', {
      // url: 'map',
      parent: 'home',
      views: {
        '@' : {
        	controller: 'MapCtrl',
        	controllerAs: 'map',
          templateUrl: 'sidebar/map/_map.html'
        }
      },
		  ncyBreadcrumb: {
		  	label: 'Campus map'
		  }
    });
}

export default {
  name: 'MapConfig',
  fn: MapConfig
};