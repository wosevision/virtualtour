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
			const SceneResource = $tourApi.scene;
			const sceneId = scope.sceneLink.scene;
			//  and handlers: success...
			const gotoSceneHandler = data => {
				$analytics.eventTrack('click', { category: 'scenelink', label: [data.parent.code, data.code].join('_') });
				$state.go('scene', { building: data.parent.code, scene: data.code });
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
					SceneResource.get({ id: sceneId }).$promise.then(gotoSceneHandler, errorHandler);
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