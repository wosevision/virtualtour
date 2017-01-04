import { isDefined } from 'angular';

function SceneCtrl($scope, $element, $compile, $aframeScene) {
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
		this.$sceneEl = $element.find('a-scene');
		this.$assetsEl = this.$sceneEl.find('a-assets');
		this.$aframeScene = $aframeScene;
		this._rightClick = false;
  }

	const setScene = (scene, sky) => {
		
		const { sceneLinks, hotSpots } = scene;

  	this.sceneLinks = sceneLinks;
  	this.hotSpots = hotSpots;

    this.checkForDraft&&this.checkForDraft();
	}

  /**
   * __$doCheck__
   * Checks $aframeScene's current scene object each digest
   * Proceeds if scene is defined; calls setScene()
   * 
   * @return {void}				No return
   */
  this.$doCheck = () => {
  	if (isDefined($aframeScene.scene)) {
			if (!this.sky || $aframeScene.sky !== this.sky) {
				this.sky = $aframeScene.sky;
	  		setScene($aframeScene.scene);
	  	}
  	}
  }

  this.$onDestroy = () => {
		this.$sceneEl.off('contextmenu', contextMenu);
  }
}

export default {
  name: 'SceneCtrl',
  fn: SceneCtrl
};
