// import { isArray } from 'angular';

class $aframeScene {
	constructor() {
		'ngInject';
	}
	get scene() {
		if (this.sceneData) {
			// console.log('Scene service queried; returning:', this.sceneData);
			return this.sceneData;
		}
	}
	set scene({ _id, sceneLinks, hotSpots, sky }) {
		this.sceneData = { _id, sceneLinks, hotSpots, sky };
		// console.log('Scene service set to:', this.sceneData);
	}
}

export default {
  name: '$aframeScene',
  fn: $aframeScene
};