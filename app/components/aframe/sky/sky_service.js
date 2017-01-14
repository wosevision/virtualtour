import { utils } from 'aframe';

const COMPRESS_MAX = 100, COMPRESS_FACTOR = 12;

/**
 * The $aframeSky class is a service responsible for
 * the business logic of the aframeSky component.
 *
 * The SceneCtrl controller uses the `$aframeSky.sky`
 * getter/setter to detect changes to the active scene's
 * sky; the SkyCtrl controller uses the `getSkyDomNode()`
 * method to produce a fully loaded `<img>` for appending
 * the SceneCtrl.$assetsEl (`<a-assets>`).
 * 
 * @memberOf app.components.aframe.sky
 */
class $aframeSky {
	constructor($q, $tourApi, CBuffer, UserSession, GLOBAL_SETTINGS) {
		'ngInject';
		this.$q = $q;
		this.Preload = $tourApi.preload;
		this.CircularBuffer = CBuffer;
		this.UserSession = UserSession;

		this.imageApiUrl = GLOBAL_SETTINGS.imageApiUrl;
	}
	/**
	 * Getter/setter for formatting sky URL from sceneData.
	 * 
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

	/**
	 * Utility function for reading and parsing user settings
	 * based on aframe's isMobile() method and the UserSession
	 * service's usage settings; parses into an object that
	 * eventually becomes a Cloudinary URL component string.
	 * 
	 * If the device is mobile, limit image resolution to 2048x1024
	 * due to rendering limit.
	 * 
	 * @return {string} Formatted Cloudinary setting string (`c_scale,f_auto,etc`)
	 */
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

	/**
	 * Fetches an efficiently-generated list of `skyUrl`s
	 * from the server, which uses a scene `_id` to read
	 * potential candidates for preloading from the scene's
	 * scenelinks.
	 *
	 * If the `UserSession` service's preloading settings are
	 * set to 1 or 2, it returns the full list for further
	 * manipulation; otherwise, it returns an empty array
	 * (0/no preload).
	 * 
	 * @param  {string} id The _id of a scene to preload links for
	 * @return {Promise}   A promise that will fulfill the preload list
	 */
	getPreloadList(id) {
		return this.$q((resolve, reject) => {
			switch(this.UserSession.usage.preloading.val) {
				case 0:
					resolve([]);
					break;
				case 1:
				case 2:
					this.Preload.get({ id }).$promise.then(data => resolve(data));
					break;
				default: 
					reject('Can\'t determine preload settings')
			}
		});
	}

	/**
	 * Converts a skyUrl and an assetId into a fully
	 * compiled DOM element; returns a promise representing
	 * a sky asset that will eventually be fully loaded.
	 *
	 * Uses `getSettings()` to parse userSession settings
	 * into a Cloudinary setting string.
	 * 
	 * @param  {string} url Partial URL, e.g. `this.sky` getter/setter
	 * @param  {string} id  An asset ID, e.g. the panorama's `public_id`
	 * @return {Promise}    A promise that will resolve to the loaded `<img>`
	 */
	getSkyDomNode(url, id) {
	  return this.$q((resolve, reject) => {
			const img = angular.element(`<img src="${ this.imageApiUrl }/${ this.getSettings() }/v${ url }" id="${ id }" crossOrigin="anonymous" />`);
	    img.on('load', () => resolve(img));
	    img.on('error', () => reject('Image load error'));
	  });
	}
}

export default {
  name: '$aframeSky',
  fn: $aframeSky
};