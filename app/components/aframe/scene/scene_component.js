/**
 * The aframeScene component definition initializes
 * the scene's bindings for its child components as
 * well as a transclusion point for the server-rendered
 * scene editor.
 *
 * @memberOf app.components.aframe.scene
 * @type {object}
 * @prop {object} bindings   Interpolated binding for the sky component, one-way bindings for sceneLinks, hotSpots and mobile
 * @prop {object} transclude Slot for scene editor if allowed by server
 * @return {object} 				 Scene definition object
 */
const aframeScene = {
    bindings: {
      sky: '@',
      sceneLinks: '<?',
      hotSpots: '<?',
      mobile: '<?'
    },
    transclude: {
      'editor': '?sceneEditor'
    },
    controller: 'SceneCtrl',
   	templateUrl: 'aframe/scene/_scene.html'
  };

export default {
  name: 'aframeScene',
  fn: aframeScene
};
