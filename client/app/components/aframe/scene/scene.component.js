import template from './scene.html';
import controller from './scene.controller';
import './scene.scss';

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
 * 
 * @prop {String} sky 				Interpolated sky url
 * @prop {Array}  sceneLinks  Array of scenelink objects
 * @prop {Array}  hotSpots		Array of hotspot object
 * @prop {Object} mobile 			Object with device info
 */
const sceneComponent = {
  controller,
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
  }
};

export default sceneComponent;
