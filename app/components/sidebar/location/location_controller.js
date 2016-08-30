function LocationCtrl($scope, $state, $timeout, $mdSidenav, $log, BuildingResource, SceneResource) {
	'ngInject';

  const lc = this;

 	lc.goTo = function(state, params, $event) {
    $state.go(state, params);
  }
  lc.goBack = function () {
    $state.go('location');
  }

  lc.locations = {
  	north: {
  		label: 'North Oshawa campus location',
  		style: { backgroundImage: `url('images/north_bg.jpg')` },
  		code: 'north',
  		active: false,
  		hidden: false,
  		children: []
  	},
  	dt: {
  		label: 'Downtown Oshawa campus location',
  		style: { backgroundImage: `url('images/dt_bg.jpg')` },
  		code: 'dt',
  		active: false,
  		hidden: false,
  		children: []
  	}
  }

  lc.gotoScene = (location, code, id) => {
    $state.go('scene', { code, id });
    // SceneResource.get({ id: id }, data => {
    // 	// $aframeScene.setScene(data.scene, id);
    // 	// $scope.activeScene = $aframeScene.scene;
    // 	mc.activeScene = data.scene;
    // 	//console.log($scope.activeScene);
    // });
  }

  lc.onToggle = function (ev, $sc, level) {
  	switch (level) {
  		case 1:
  			$sc.item.children = BuildingResource.query({location: $sc.item.code});
  			$state.transitionTo('location', { location: $sc.item.code }, { location: 'false', inherit: true, relative: $state.$current });
  			lc.currentLocation = $sc.item;
  			break;
  		case 2:
  			$sc.item.children = SceneResource.getAll({id: $sc.item.code});
  			$state.transitionTo('building', { code: $sc.item.code }, { location: 'false', inherit: true, relative: $state.$current });
  			lc.currentBuilding = $sc.item;
  			// console.log($sc.item.children);
  			break;
  		case 3:
  			//$sc.item.children = [SceneResource.get({id: [$sc.$parent.item.code, $sc.item.code].join('_') })];

  			$state.go('scene', { code: $sc.$parent.item.code, id: $sc.item.code});
  			lc.currentScene = $sc.item;
  			break;
  		default:
  			break;
  	}
  }
  
  lc.currentLocation = {};
  lc.currentBuilding = {};

}

export default {
  name: 'LocationCtrl',
  fn: LocationCtrl
};
