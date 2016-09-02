function LocationCtrl($scope, $state, $timeout, $mdSidenav, $log, BuildingResource, SceneResource) {
	'ngInject';

  const lc = this;

 	lc.goTo = function(state, params, $event) {
    $state.go(state, params);
  }
  lc.goBack = function () {
    $state.go('location');
  }
  lc.gotoScene = (location, code, id) => {
    $state.go('scene', { code, id });
  }

  lc.locations = [{
		name: 'North',
		label: 'North Oshawa campus location',
		style: { backgroundImage: `url('images/north_bg.jpg')` },
		code: 'north',
		active: false,
		hidden: false,
		children: []
	},
	{
		name: 'Downtown',
		label: 'Downtown Oshawa campus location',
		style: { backgroundImage: `url('images/dt_bg.jpg')` },
		code: 'dt',
		active: false,
		hidden: false,
		children: []
	}]

	lc.current = [];
  // lc.currentScene = lc.currentLocation = lc.currentBuilding = {};
  const callbacks = [
  	() => { return; },
	  ($sc) => {
			$state.transitionTo('location', { location: $sc.item.code }, { location: 'false', inherit: true, relative: $state.$current });
			// lc.currentLocation = $sc.item;
			return BuildingResource.query({location: $sc.item.code});
	  },
	  ($sc) => {
			$state.transitionTo('building', { code: $sc.item.code }, { location: 'false', inherit: true, relative: $state.$current });
			// lc.currentBuilding = $sc.item;
			return SceneResource.getAll({id: $sc.item.code});
	  },
	  ($sc) => {
			$state.go('scene', { code: $sc.$parent.item.code, id: $sc.item.code});
			// lc.currentScene = $sc.item;
			return [SceneResource.get({id: [$sc.$parent.item.code, $sc.item.code].join('_') })];
	  }
	]

  lc.onToggle = function (ev, $sc) {
  	let getChildren = callbacks[$sc.level];
  	$sc.item.children = getChildren($sc);
  	lc.current[$sc.level] = $sc.item;
  }

}

export default {
  name: 'LocationCtrl',
  fn: LocationCtrl
};
