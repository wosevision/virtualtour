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
const sceneEditor = {
    controller: 'EditorCtrl',
    require: {
    	SceneCtrl: '^aframeScene'
    },
   	templateUrl: 'aframe/editor/_editor.html'
  };

export default {
  name: 'sceneEditor',
  fn: sceneEditor
};
