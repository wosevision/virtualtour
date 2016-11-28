class EditorDialogCtrl {
	static get $inject() {
		return ['$q', '$scope', 'BuildingResource', 'SceneResource'];
	}
	constructor($q, $scope, BuildingResource, SceneResource) {
		this.$q = $q;
		this.BuildingResource = BuildingResource;
		this.SceneResource = SceneResource;
		this.parentList = {};
		if (this.scene) {
			SceneResource.get({ id: this.scene }).$promise.then(scene => {
				this.scene = scene;
				BuildingResource.get({ id: scene.parent._id }).$promise.then(building => {
					this.building = building;
				});
			});
		}
	}
	loadBuildings(callback) {
		return this.BuildingResource.query().$promise.then(buildings => {
			this.buildings = buildings;
			callback&&callback(buildings);
		});
	}
	loadScenes(callback) {
		return this.SceneResource.query(this.building ? {
			filter: {
				parent: this.building._id
			}
		} : null).$promise.then(scenes => {
			this.scenes = scenes;
			callback&&callback(scenes);
		});
	}
	//
	getParent(id) {
		return this.BuildingResource.get({id}).$promise.then(building => {
			return building.label || building.name;
		});
	}
	queryScenes(q) {
		const query = this.SceneResource.query().$promise;
		query.then(scenes => {
			scenes.forEach(scene => {
				this.BuildingResource.get({ id: scene.parent }).$promise.then(building => {
					this.parentList[scene.parent] = building.label || building.name;
				});
			})
		})
		return query;
	}
	closeDialog() {
		this.mdPanelRef.close();
	}
	//
}

export default {
  name: 'EditorDialogCtrl',
  fn: EditorDialogCtrl
};
