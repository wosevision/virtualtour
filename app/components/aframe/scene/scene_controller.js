import { isUndefined } from 'angular';

function SceneCtrl($scope, $aframeScene) {
	'ngInject';

  	// console.log($scope);
  /**
   * Checks if sky ID exists and is not already loaded
   * Loads <img> asset with loadSkyAsset() and saves
   * Loads <a-sky> entity with loadSky() and saves
   * 
   * @param  {string} sky ID for asset reference
   * @return {void}				No return
   */
  const handleSceneWatch = (newData, oldData) => {
  	if (!isUndefined(newData)) {
  		if (isUndefined(oldData) || newData.sky !== oldData.sky) {
  			let scene = newData.scene;
		  	$scope.sky = newData.sky;

		  	$scope.sceneLinks = scene.sceneLinks;
		  	$scope.entities = scene.entities;
		  	$scope.assets = scene.assets;
  			console.log(scene);
  		}
  	}
  }
  $scope.$watch( () => {
  	return $aframeScene.getScene();
  }, handleSceneWatch);
}

export default {
  name: 'SceneCtrl',
  fn: SceneCtrl
};
