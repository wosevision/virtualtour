/** @memberOf app.components.aframe.scene */
import { isDefined } from 'angular';

/**
 * The scene controller manages all top-level functionality
 * of the scene component; it is responsible for initializing
 * the DOM elements of the scene and updating them when the
 * $aframeScene service changes.
 * 
 * @namespace SceneCtrl
 * @memberOf app.components.aframe.scene
 * @param {object} $scope       Current scope
 * @param {object} $element     <aframe-scene> outer elements
 * @param {object} $aframeScene Scene service dependency
 */
function SceneCtrl($scope, $element, $aframeScene) {
	'ngInject';

  /**
	 * Store JQLite-wrapped <a-scene> and <a-assets>
	 * Init internal check for right click event
   *
   * @memberOf SceneCtrl
   * @return {void}		No return
   */
  this.$onInit = () => {
		this.$sceneEl = $element.find('a-scene');
		this.$assetsEl = this.$sceneEl.find('a-assets');
		this.$aframeScene = $aframeScene;
		this._rightClick = false;
  }

	const setScene = scene => {
		
		const { sceneLinks, hotSpots } = scene;

  	this.sceneLinks = sceneLinks;
  	this.hotSpots = hotSpots;

    this.checkForDraft&&this.checkForDraft();
	}

  /**
   * Checks $aframeScene's current scene object each digest
   * Proceeds if scene is defined; calls setScene()
   * 
   * @memberOf SceneCtrl
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
