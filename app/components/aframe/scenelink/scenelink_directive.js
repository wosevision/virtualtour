function sceneLink($state, $popupWindow, $tourApi, $analytics) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
    	sceneLink: '='
    },
    require: '^aframeScene',
    templateUrl: 'aframe/scenelink/_scenelink.html',
		link(scope, elem, attrs, SceneCtrl) {
			const SceneResource = $tourApi.scene,
						LocationResource = $tourApi.location;
			const sceneId = scope.sceneLink.scene;
			//  and handlers: success...
			const gotoSceneHandler = data => {
				$analytics.eventTrack('click', { category: 'scenelink', label: [data.scene.parent.code, data.scene.code].join('_') });
				$state.transitionTo('scene', { location: data.location.code, building: data.scene.parent.code, scene: data.scene.code });
				// $state.go('scene', { building: data.parent.code, scene: data.code });
			}
			// ...and error
			const errorHandler = error => {
			  const locals = {
					type: 'Scene load error!',
					message: 'Looks like this scene link is broken – darn.'
		  	}
				$popupWindow.error({ locals });
			}
			//
			// Listen for clicks on scene link element
			const elemClick =  () => {
				// If there's a right click active...
				if (SceneCtrl._rightClick && SceneCtrl._editable) {
					// ...open the scene link editor:
					SceneCtrl.openEditor(SceneCtrl._rightClick, scope.sceneLink, SceneCtrl.sceneLinks);
				} else {
					// ...otherwise just use the default scene link behavior
					document.getElementById(`link_${sceneId}`).emit('goto');
					let scene;
					SceneResource.get({ id: sceneId }).$promise
						.then(data => {
							scene = data;
							return LocationResource.get({ id: scene.parent.parent }).$promise;
						}) //**
						.then(location => ({ location, scene }) ) //**
						.then(gotoSceneHandler, errorHandler);
				}
			};
			elem.on('click', elemClick);

			// Scope cleanup on $destroy
			scope.$on('$destroy', () => {
				elem.off('click');
			});
    }
  };
}

export default {
  name: 'sceneLink',
  fn: sceneLink
};