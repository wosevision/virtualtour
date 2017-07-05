import { DrilldownItem } from './drilldown';
import { TourResourceService } from '../../common/resource/tour-resource.service'; 

export class DrilldownService {
	structure: vt.IDrilldownItem[];

	constructor(
		private TourResourceService: TourResourceService,
	) {
		'ngInject';
	}

	getLocations(): ng.IPromise<vt.IDrilldownItem[]> {
		return this.TourResourceService.location.query().$promise
      .then(data => data.map(item => new DrilldownItem(item)));
	}

	getBuildings(parent): ng.IPromise<vt.IDrilldownItem[]> {
		return this.TourResourceService.building.query({
			filter: { parent }
		}).$promise
      .then(data => data.map(item => new DrilldownItem(item)));
	}

	getScenes(parent): ng.IPromise<vt.IDrilldownItem[]> {
		return this.TourResourceService.scene.query({
			filter: { parent }
		}).$promise
      .then(data => data.map(item => new DrilldownItem(item)));
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