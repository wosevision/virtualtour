export class DrilldownService {
	constructor($tourApi) {
		'ngInject';
		this.$tourApi = $tourApi;
	}

	getLocations() {
		return this.$tourApi.location.query().$promise;
	}

	getBuildings(parent) {
		return this.$tourApi.building.query({
			filter: { parent }
		}).$promise;
	}

	getScenes(parent) {
		return this.$tourApi.scene.query({
			filter: { parent }
		}).$promise;
	}

	async getDrilldown() {
		let structure;

		structure = await this.getLocations();
		structure.forEach(async location => {

			location._params = { location: location.code };
			location._level = 'location';
			location.children = await this.getBuildings(location._id);
			location.children.forEach(async building => {

				building._params = { location: location.code, building: building.code };
				building._level = 'location.building';
				building.children = await this.getScenes(building._id);
				building.children.forEach(async scene => {

					scene._params = { location: location.code, building: building.code, scene: scene.code };
					scene._level = 'location.building.scene';
				});
			});
		});

		return structure;
	}
}