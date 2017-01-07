import { isDefined } from 'angular';
import { utils } from 'aframe';

function SkyCtrl($scope, $compile, $tourApi, UserSession, CBuffer) {
	'ngInject';

	/**
	 * Cache vars to store JQLite <img> and <a-sky>
	 * Flag for init sky load and array of loaded skies
	 * 
	 * @type {null}
	 * @type {null}
	 * @type {boolean}
	 * @type {Array}
	 */
	let $sky,
			$skyAsset,
			skyElLoaded = false;
	const skyLoadedList = [];

  /**
   * __$onInit__
	 * Store JQLite-wrapped <a-scene> and <a-assets>
	 * Init internal check for right click event
   * 
   * @return {void}		No return
   */
  this.$onInit = () => {
		this.$sceneEl = this.SceneCtrl.$sceneEl;
		this.$assetsEl = this.SceneCtrl.$assetsEl;
  }

	/**
	 * Compiles a new <a-sky> and binds to scope.sky
	 * Flags sky element as loaded
	 * 
	 * @param  {string} sky ID for asset reference
	 * @return {Element}    JQLite-wrapped <a-sky> element
	 */
	const loadSky = () => {
		return $compile('<a-sky ng-src="{{ $ctrl.loadedSky }}" />')($scope, clone => {
			this.$sceneEl.append(clone);
			skyElLoaded = true;
			return clone;
		});
	}

	const COMPRESS_MAX = 100, COMPRESS_FACTOR = 12;
	const getSettings = () => {
		const mobile = (utils.isMobile || utils.device.isMobile)(),
					lowRes = !UserSession.usage.resolution.val;
		const settings = {
			w: mobile||lowRes ? 2048 : 4096,
			h: mobile||lowRes ? 1024 : 2048,
			c: 'scale',
			f: 'auto',
			q: COMPRESS_MAX - (COMPRESS_FACTOR * UserSession.usage.compression.val)
		}
		const output = [];
		Object.keys(settings).forEach(key => {
			output.push(`${key}_${settings[key]}`)
		})
		return output.join(',');
	}

	/**
	 * Compiles a new image asset with requested code
	 * Adds element to assets and ID to list to prevent reload
	 * 
	 * @param  {string}   asset ID for asset reference
	 * @param  {Function} cb    Callback after load
	 * @return {Element}        JQLite-wrapped <img> element
	 */
	const loadSkyAsset = (skyUrl, cb) => {

		// const assetPath = `api/panoramas/${ asset.split('_').join('/') }.jpg`;
		const assetId = skyUrl.split('scenes/panorama/')[1].split('.')[0];

		// return $compile(`<img src="${ assetPath }" id="${ asset }" />`)(scope, function (clone) {
		return $compile(`<img src="//res.cloudinary.com/uoit-virtual-tour/image/upload/${ getSettings() }/v${ skyUrl }" id="${ assetId }" crossOrigin="anonymous" />`)($scope, clone => {
      clone.on('load', event => {
        $scope.$apply(() => {
					this.$assetsEl.append(clone);
					skyLoadedList.push(assetId);
					cb(assetId);
        });
				return clone;
      });
		});
	}

	const setSky = sky => {
		
		this.sky = sky;
  	
		const skyId = sky.split('scenes/panorama/')[1].split('.')[0];
  	if (!skyLoadedList.includes(skyId)) {
      $skyAsset = loadSkyAsset(this.sky, () => {
        this.loadedSky = `#${skyId}`;
        if(!skyElLoaded) {
          $sky = loadSky();
        }
      });
    } else {
      this.loadedSky = `#${skyId}`;
    }
    if (UserSession.usage.preloading.val > 0) {
    	// $tourApi.preload()
    	// this.preload.forEach(link => {
    	// 	console.log(link.scene);
    	// });
    }
	}

  /**
   * __$doCheck__
   * Checks $aframeScene's current scene object each digest
   * Proceeds if scene is defined; calls setSky()
   * 
   * @return {void}				No return
   */
  this.$onChanges = newData => {
  	let sky = newData.sky.currentValue;
  	if (isDefined(sky)) {
  		setSky(sky);
  	}
  }
}

export default {
  name: 'SkyCtrl',
  fn: SkyCtrl
};
