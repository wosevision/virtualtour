class $aframeScene {
	constructor($rootScope) {
		'ngInject';
		
		this.$rootScope = $rootScope;

		return this;
	}
	setScene({ scene, sky }) {
		this.sceneData = { scene, sky };

		(this.$rootScope.debugMode.scene)&&console.log('Scene service set to:', this.sceneData);
	}
	getScene() {
		(this.$rootScope.debugMode.scene)&&console.log('Scene service queried; returning:', this.sceneData);

		return this.sceneData;
	}
}

export default {
  name: '$aframeScene',
  fn: $aframeScene
};