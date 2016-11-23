class LinkEditorCtrl {
	static get $inject() {
		return ['$q', 'BuildingResource', 'SceneResource'];
	}
	constructor($q, BuildingResource, SceneResource) {
		this.$q = $q;
		this.BuildingResource = BuildingResource;
		this.SceneResource = SceneResource;
		this.parentList = {};
	}
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
}

export default {
  name: 'LinkEditorCtrl',
  fn: LinkEditorCtrl
};
