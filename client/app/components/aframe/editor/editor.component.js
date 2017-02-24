import template from './editor.html';
import controller from './editor.controller';
import './editor.scss';

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
const editorComponent = {
	template,
	controller,
  require: {
  	SceneCtrl: '^aframeScene'
  }
};

export default editorComponent;
