import { element, isDefined } from 'angular';

import { SkyService } from '../sky/sky.service';
import { SceneService } from '../scene/scene.service';

import template from './scene.html';

export class SceneController implements ng.IController {
  _rightClick: boolean = false;
  _currentSceneId: string = '';

  $sceneEl: ng.IAugmentedJQuery;
  $assetsEl: ng.IAugmentedJQuery;
  $cameraEl: ng.IAugmentedJQuery;

  sceneLinks: any[];
  hotSpots: any[];
  entities: any[];
  parent: any[];

  checkForDraft: () => any;

  sky: string;

  constructor(
    private $element: ng.IRootElementService, 
    private $aframeScene: SceneService, 
    private $aframeSky: SkyService
  ) {
    'ngInject';
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
    this.$cameraEl = element(document.getElementById('aframe-camera'));
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
    
    const { sceneLinks, hotSpots, entities, parent, _id } = scene;

    this.sceneLinks = sceneLinks;
    this.hotSpots = hotSpots;
    this.entities = entities;
    this.parent = parent;
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
   */
  $doCheck() {
    if (isDefined(this.$aframeScene.scene)) {
      if (this.$aframeScene.scene._id && this.$aframeScene.scene._id !== this._currentSceneId) {
        this.setScene(this.$aframeScene.scene);
        console.log('[scene.component] $doCheck scene', this.$aframeScene.scene);
      }
    } else return;
    if (this.$aframeSky.sky) {
      if (!this.sky || this.$aframeSky.sky !== this.sky) {
        this.sky = this.$aframeSky.sky;
        console.log('[scene.component] $doCheck sky', this.sky);
      }
    }
  }
}

/**
 * The aframeScene component definition initializes
 * the scene's bindings for its child components as
 * well as a transclusion point for the server-rendered
 * scene editor.
 *
 * @example
 * <aframe-scene
 *   sky="{{ $ctrl.scene.sky }}"
 *   scene-links="$ctrl.scene.sceneLinks"
 *   hot-spots="$ctrl.scene.hotSpots"
 *   mobile="$ctrl.mobile">
 * </aframe-scene>
 */
export const SceneComponent: ng.IComponentOptions = {
 	template,
  bindings: {
    sky: '@',
    sceneLinks: '<?',
    hotSpots: '<?',
    entities: '<?',
    mobile: '<?'
  },
  transclude: {
    'editor': '?ngTransclude'
  },
  controller: SceneController
};
