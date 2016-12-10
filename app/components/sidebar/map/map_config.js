function MapConfig($stateProvider) {
  'ngInject'

	$stateProvider
    .state('map', {
      parent: 'home',
      resolve: {
      	onGotoBldg($state) {
      		return () => data => $state.go('building', data);
      	}
      },
      component: 'campusMap'
    });
}

export default {
  name: 'MapConfig',
  fn: MapConfig
};