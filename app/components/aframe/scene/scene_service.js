class $aframeScene {
	constructor() {
		return this;
	}
	setScene({ scene, sky }) {
		console.log(scene, sky);
		this.sceneData = { scene, sky };
	}
	getScene() {
		return this.sceneData;
	}
}

export default {
  name: '$aframeScene',
  fn: $aframeScene
};