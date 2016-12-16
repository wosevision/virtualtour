class EditorDialogCtrl {
	constructor(
		$scope, $filter,
		$tourApi, $mapApi) {
		'ngInject';
		this.$filter = $filter;
		this.LocationResource = $tourApi.location;
		this.BuildingResource = $tourApi.building;
		this.SceneResource = $tourApi.scene;
		this.CategoryResource = $mapApi.category;
		this.FeatureResource = $mapApi.feature;
		this.CollectionResource = $mapApi.collection;
		if (this.item.scene) {
			$scope.$applyAsync(() => {
				this.initCurrentScene();
			});
		}
		if (this.item.feature) {
			$scope.$applyAsync(() => {
				this.initCurrentFeature();
			});
		}
	}
	initCurrentCategory() {
		let _id;
		this.loadCategories(categories => {
			_id = this.feature.properties.category&&this.feature.properties.category.hasOwnProperty('_id') 
				? this.feature.properties.category._id
				: this.feature.properties.category;
			this.category = this.$filter('filter')(categories, { _id }, true)[0];
		});
	}
	initCurrentFeature() {
		let _id;
		this.loadFeatures(features => {
			_id = this.item.feature&&this.item.feature.hasOwnProperty('_id')
				? this.item.feature._id
				: this.item.feature;
			this.feature = this.$filter('filter')(features, { _id }, true)[0];
			this.initCurrentCategory();
		});
	}
	initCurrentScene() {
		let _id;
		this.loadScenes(scenes => {
			_id = this.item.scene.hasOwnProperty('_id')
				? this.item.scene._id
				: this.item.scene;
			this.scene = this.$filter('filter')(scenes, { _id }, true)[0];
			this.initCurrentBuilding();
		});
	}
	initCurrentBuilding() {
		let _id;
		this.loadBuildings(buildings => {
			_id = this.scene.parent.hasOwnProperty('_id')
				? this.scene.parent._id
				: this.scene.parent;
			this.building = this.$filter('filter')(buildings, { _id }, true)[0];
			this.initCurrentLocation();
		});
	}
	initCurrentLocation() {
		let _id;
		this.loadLocations(locations => {
			_id = this.building.parent.hasOwnProperty('_id')
				? this.building.parent._id
				: this.building.parent;
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
	loadCategories(cb) {
		return this.CategoryResource.query().$promise.then(categories => {
			this.categories = categories;
			cb&&cb(categories);
		});
	}
	loadFeatures(cb) {
		return this.FeatureResource.query(this.category ? {
			filter: {
				"properties.category": this.category._id
			}
		} : null).$promise.then(features => {
			this.features = features;
			cb&&cb(features);
		});
	}
	onChangeCategory() {
		this.feature = null;
	}
	onChangeFeature() {
		this.item.feature = this.feature;
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
