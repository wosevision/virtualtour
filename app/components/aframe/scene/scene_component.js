/**
 * A-FRAME SCENE DIRECTIVE
 * Converts arrays of standardized objects to A-Frame
 * compatible DOM elements via the aframeEntity directive
 * and manages their lifecycles in the context of a scene
 * 
 * @param  {Function} $compile     DI: compiler service
 * @param  {Function} $aframeScene DI: scene service
 * @return {Object}                Scene definition object
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
