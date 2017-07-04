import { element, isDefined } from 'angular';
import {
  Component,
  OnInit,
  Inject,
  Input,
} from 'ng-metadata/core';

import { SkyService } from '../sky/sky.service';
import { SceneService } from '../scene/scene.service';

import template from './scene.html';

@Component({
  selector: 'aframe-scene',
  template,
  legacy: {
    transclude: {
      'editor': '?ngTransclude'
    }
  }
})
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
export class SceneComponent implements ng.IController, OnInit {

  @Input() sky: string;
  @Input() sceneLinks: any[];
  @Input() hotSpots: any[];
  @Input() entities: any[];
  @Input() mobile;

  _rightClick: boolean = false;
  _currentSceneId: string = '';

  $sceneEl: ng.IAugmentedJQuery;
  $assetsEl: ng.IAugmentedJQuery;
  $cameraEl: ng.IAugmentedJQuery;

  parent: any[];

  checkForDraft: () => any;

  constructor(
    private SceneService: SceneService, 
    private SkyService: SkyService,
    @Inject('$element') private $element: ng.IRootElementService,
  ) { }

  /**
   * Lifecycle hook to initialize component properties; sets
   * a boolean to hold the rightclick-active flag (for when a
   * user mouseups the scene with right button) and a string
   * for the current active scene's ID.
   * 
   * Also stores JQLite-wrapped <a-scene> and <a-assets> for
   * appending child elements into the scene from inner components.
   */
  ngOnInit() {
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
   * Checks SceneService's current scene object; proceeds if
   * scene is defined and calls `setScene()` on the incoming data.
   *
   * Checks if there is a sky active on SkyService, and if so, if
   * it is different from the current active sky. Sets the conroller's
   * sky if they differ or if the controller has no sky.
   */
  $doCheck() {
    if (isDefined(this.SceneService.scene)) {
      if (this.SceneService.scene._id && this.SceneService.scene._id !== this._currentSceneId) {
        this.setScene(this.SceneService.scene);
        console.log('[scene.component] $doCheck scene', this.SceneService.scene);
      }
    } else return;
    if (this.SkyService.sky) {
      if (!this.sky || this.SkyService.sky !== this.sky) {
        this.sky = this.SkyService.sky;
        console.log('[scene.component] $doCheck sky', this.sky);
      }
    }
  }
}
