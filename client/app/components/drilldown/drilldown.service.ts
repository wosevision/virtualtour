import { TourResourceService } from '../../common/resource/tour-resource.service'; 

export class DrilldownService {
	structure: vt.IDrilldownItem[];

	constructor(
		private $tourApi: TourResourceService,
	) {
		'ngInject';
	}

	getLocations(): Promise<vt.IDrilldownItem[]> {
		return this.$tourApi.location.query().$promise;
	}

	getBuildings(parent): Promise<vt.IDrilldownItem[]> {
		return this.$tourApi.building.query({
			filter: { parent }
		}).$promise;
	}

	getScenes(parent): Promise<vt.IDrilldownItem[]> {
		return this.$tourApi.scene.query({
			filter: { parent }
		}).$promise;
	}

	async getDrilldown(): Promise<vt.IDrilldownItem[]> {

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