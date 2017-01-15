import { isDefined, equals } from 'angular';

/**
 * The scene controller manages all top-level functionality
 * of the scene component; it is responsible for initializing
 * the DOM elements of the scene and updating them when the
 * $aframeScene service changes.
 * 
 * @memberOf app.components.aframe.scene
 */
class SceneCtrl {
	/**
	 * Initializes the SceneCtrl's dependencies
	 * @param  {object} $scope       The current scope
	 * @param  {jqlite} $element     The component's <aframe-scene> element
	 * @param  {object} $aframeScene The scene service
	 * @param  {object} $aframeSky   The sky service
	 */
	constructor($scope, $element, $aframeScene, $aframeSky) {
		'ngInject';
		this.$scope = $scope;
		this.$element = $element;
		this.$aframeScene = $aframeScene;
		this.$aframeSky = $aframeSky;
	}

  /**
   * Lifecycle hook to initialize component properties; sets
   * a boolean to hold the rightclick-active flag (for when a
   * user mouseups the scene with right button) and a string
   * for the current active scene's ID.
   * 
	 * Also stores JQLite-wrapped <a-scene> and <a-assets> for
	 * appending child elements into the scene from inner components.
   */
  $onInit() {
		this._rightClick = false;
		this._currentSceneId = '';

		this.$sceneEl = this.$element.find('a-scene');
		this.$assetsEl = this.$sceneEl.find('a-assets');
  }

  /**
   * Extracts an incoming scene object's relevant data (`id`, `sceneLinks`,
   * and `hotSpots`) and assigns them to the controller for rendering
   * on the component.
   *
   * If the server-side editor component is attached (i.e. admin user is
   * logged in), it will have mounted a `checkForDraft()` method on the
   * controller, which is called here to announce if a newly-navigated-to
   * scene has saved drafts.
   * 
   * @param {object} scene A scene object from API/database
   */
	setScene(scene) {
		
		const { sceneLinks, hotSpots, _id } = scene;

  	this.sceneLinks = sceneLinks;
  	this.hotSpots = hotSpots;
  	this._currentSceneId = _id;

    this.checkForDraft&&this.checkForDraft();
	}

  /**
   * Lifecycle hook to run a check on every digest loop cycle.
   * 
   * Checks $aframeScene's current scene object; proceeds if
   * scene is defined and calls `setScene()` on the incoming data.
   *
   * Checks if there is a sky active on $aframeSky, and if so, if
   * it is different from the current active sky. Sets the conroller's
   * sky if they differ or if the controller has no sky.
   * 
   */
  $doCheck() {
  	if (isDefined(this.$aframeScene.scene)) {
  		if (this.$aframeScene.scene._id && this.$aframeScene.scene._id !== this._currentSceneId) {
			// if (!this.sky || this.$aframeScene.sky !== this.sky) {
				// this.sky = this.$aframeScene.sky;
	  		this.setScene(this.$aframeScene.scene);
	  	}
  	} else return;
  	if (this.$aframeSky.sky) {
			if (!this.sky || this.$aframeSky.sky !== this.sky) {
				this.sky = this.$aframeSky.sky;
				console.log('scene controller detects change in sky service', this.sky);
	  	}
  	}
  }

  /**
   * Lifecycle cleanup method; unattaches event listener
   * for context menu (right click) events from the scene.
   */
  $onDestroy() {
		this.$sceneEl.off('contextmenu', contextMenu);
  }
}

export default {
  name: 'SceneCtrl',
  fn: SceneCtrl
};
