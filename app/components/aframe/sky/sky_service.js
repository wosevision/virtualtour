import { utils } from 'aframe';

const COMPRESS_MAX = 100, COMPRESS_FACTOR = 12;

class $aframeSky {
	constructor($http, $q, UserSession, GLOBAL_SETTINGS) {
		'ngInject';
		this.$http = $http;
		this.$q = $q;
		this.UserSession = UserSession;
	}
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

	getSettings() {
		const mobile = (utils.isMobile || utils.device.isMobile)(),
					lowRes = !this.UserSession.usage.resolution.val;
		const settings = {
			w: mobile||lowRes ? 2048 : 4096,
			h: mobile||lowRes ? 1024 : 2048,
			c: 'scale',
			f: 'auto',
			q: COMPRESS_MAX - (COMPRESS_FACTOR * this.UserSession.usage.compression.val)
		}
		const output = [];
		Object.keys(settings).forEach(key => {
			output.push(`${key}_${settings[key]}`)
		})
		return output.join(',');
	}
}

export default {
  name: '$aframeSky',
  fn: $aframeSky
};