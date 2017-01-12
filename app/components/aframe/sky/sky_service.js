import { isArray, isObject } from 'angular';
import { pick } from 'lodash';

class $aframeSky {
	// constructor($scope) {
	// 	'ngInject';
	// }
	/**
	 * Getter/setter for formatting sky URL from sceneData
	 * @type {string}
	 * @example
	 * 'http://res.cloudinary.com/uoit-virtual-tour/image/upload/v1480529929/scenes/panorama/k23dnerigdctblxgq5vm.jpg'
	 */
	get sky() {
		return this.panorama ? [ this.panorama.version, this.panorama.public_id].join('/') : null;
	}
	set sky(panorama) {
		console.log('sky service set to:', panorama)
		this.panorama = panorama;
	}
}

export default {
  name: '$aframeSky',
  fn: $aframeSky
};