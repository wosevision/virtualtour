class EditorDialogCtrl {
	constructor($scope, $filter, LocationResource, BuildingResource, SceneResource) {
		'ngInject';
		this.$filter = $filter;
		this.LocationResource = LocationResource;
		this.BuildingResource = BuildingResource;
		this.SceneResource = SceneResource;
		if (this.item.scene) {
			$scope.$applyAsync(() => {
				this.initCurrentScene();
			});
		}
	}
	initCurrentScene() {
		let _id;
		this.loadScenes(scenes => {
			_id = this.item.scene.hasOwnProperty('_id') ? this.item.scene._id : this.item.scene;
			this.scene = this.$filter('filter')(scenes, { _id }, true)[0];
			this.initCurrentBuilding();
		});
	}
	initCurrentBuilding() {
		let _id;
		this.loadBuildings(buildings => {
			_id = this.scene.parent.hasOwnProperty('_id') ? this.scene.parent._id : this.scene.parent;
			this.building = this.$filter('filter')(buildings, { _id }, true)[0];
			this.initCurrentLocation();
		});
	}
	initCurrentLocation() {
		let _id;
		this.loadLocations(locations => {
			_id = this.building.parent.hasOwnProperty('_id') ? this.building.parent._id : this.building.parent;
			this.location = this.$filter('filter')(locations, { _id }, true)[0];
		});
	}
	loadLocations(cb) {
		return this.LocationResource.query().$promise.then(locations => {
			this.locations = locations;
			cb&&cb(locations);
		});
	}
	loadBuildings(cb) {
		return this.BuildingResource.query(this.location ? {
			filter: {
				parent: this.location._id
			}
		} : null).$promise.then(buildings => {
			this.buildings = buildings;
			cb&&cb(buildings);
		});
	}
	loadScenes(cb) {
		return this.SceneResource.query(this.building ? {
			filter: {
				parent: this.building._id
			}
		} : null).$promise.then(scenes => {
			this.scenes = scenes;
			cb&&cb(scenes);
		});
	}
	onChangeScene() {
		this.item.scene = this.scene._id;
	}
	onChangeBuilding() {
		this.item.building = this.building._id;
		this.scene = null;
	}
	onChangeLocation() {
		this.item.location = this.location._id;
		this.building = null;
		this.scene = null;
	}
	//
}

export default {
  name: 'EditorDialogCtrl',
  fn: EditorDialogCtrl
};
