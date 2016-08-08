class $aframeScene {
	setScene(scene, id) {
		this.id = id;
		this.scene = scene;
	}
	getScene() {
		return this.scene;
	}
}

export default {
  name: '$aframeScene',
  fn: $aframeScene
};