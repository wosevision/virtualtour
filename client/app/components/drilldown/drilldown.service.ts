interface DrilldownItem {
	_params: object;
	_level: string;
	_id: string;
	default: string;
	children: DrilldownItem[];
	label: string;
	name: string;
	code: string;
}

export class DrilldownService {
	structure: DrilldownItem[];

	constructor(
		private $tourApi,
	) {
		'ngInject';
	}

	getLocations(): Promise<any> {
		return this.$tourApi.location.query().$promise;
	}

	getBuildings(parent): Promise<any> {
		return this.$tourApi.building.query({
			filter: { parent }
		}).$promise;
	}

	getScenes(parent): Promise<any> {
		return this.$tourApi.scene.query({
			filter: { parent }
		}).$promise;
	}

	async getDrilldown() {

		if (this.structure) return this.structure;

		this.structure = await this.getLocations();
		this.structure.forEach(async location => {

			location._params = { location: location.code };
			location._level = 'location';
			location.children = await this.getBuildings(location._id);
			location.children.forEach(async building => {

				building._params = { location: location.code, building: building.code };
				building._level = 'building';
				building.children = await this.getScenes(building._id);
				building.children.forEach(async scene => {

					scene._params = { location: location.code, building: building.code, scene: scene.code };
					scene._level = 'scene';
				});
			});
		});

		return this.structure;
	}
}