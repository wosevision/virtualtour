/**
 * The scene editor is an attachment for the scene
 * component that allows in-scene editing of scene elements.
 * It should only be rendered directly by the server, when
 * an admin user is logged in.
 * @example
 * <aframe-scene> <!-- required -->
 *   <scene-editor></scene-editor>
 * </aframe-scene>
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
