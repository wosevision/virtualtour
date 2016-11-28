import { isUndefined } from 'angular';

function SceneCtrl($scope, $element, $compile, $aframeScene) {
	'ngInject';

	/**
	 * Cache vars for <a-scene> and <a-assets>
	 * Store JQLite-wrapped DOM elements
	 * 
	 * @type {Element}
	 * @type {Element}
	 */
	this.$sceneEl = $element.find('a-scene');
	this.$assetsEl = this.$sceneEl.find('a-assets');

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
		this.$sceneEl = $element.find('a-scene');
		this.$assetsEl = this.$sceneEl.find('a-assets');
		this._rightClick = false;
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
		return $compile(`<img src="http://res.cloudinary.com/uoit-virtual-tour/image/upload/w_4096,h_2048,c_scale,f_auto,q_60/v${ skyUrl }" id="${ assetId }" crossOrigin="anonymous" />`)($scope, clone => {
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

	const setScene = scene => {
		
		const { sky, sceneLinks, hotSpots } = scene;
		this.sky = sky;
  	this.sceneLinks = sceneLinks;
  	this.hotSpots = hotSpots;
  	
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
	}

  /**
   * __$onInit__
   * 
   * @return {void}		No return
   */
  // this.$onInit = () => {
  // 	console.log(sky, scene);
  // }

  /**
   * __$doCheck__
   * Checks $aframeScene's current scene object each digest
   * Proceeds if scene is defined; calls setScene()
   * 
   * @return {void}				No return
   */
  this.$doCheck = () => {
  	if (!isUndefined($aframeScene.scene)) {
			if (!this.sky || $aframeScene.scene.sky !== this.sky) {
	  		setScene($aframeScene.scene);
	  	}
  	}
  }
}

export default {
  name: 'SceneCtrl',
  fn: SceneCtrl
};
