function sceneLink($state, $ErrorReporter, SceneResource) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
    	sceneLink: '='
    },
    require: '^aframeScene',
    templateUrl: 'aframe/scenelink/_scenelink.html',
		link(scope, elem, attrs, SceneCtrl) {
			// Set up scene ID reference...
			const sceneId = scope.sceneLink.scene;
			//  and handlers: success...
			const gotoSceneHandler = data => {
				$analytics.eventTrack('click', { category: 'scenelink', label: [data.parent.code, data.code].join('_') });
				document.getElementById(`link_${sceneId}`).emit('goto');
				$state.go('scene', { building: data.parent.code, scene: data.code });
			}
			// ...and error
			const errorHandler = error => {
			  const locals = {
					type: 'Scene load error!',
					message: 'Looks like this scene link is broken – darn.'
		  	}
				$ErrorReporter.error({ locals });
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
					SceneResource.get({ id: sceneId }).$promise.then(gotoSceneHandler, errorHandler);
				}
			};
			elem.on('click', elemClick);
			//
			// const sceneId = scope.sceneLink.scene;
			// // Listen for clicks on scene link element
			// const elemClick =  () => {
			// 	// If there's a right click active...
			// 	if (SceneCtrl._rightClick && SceneCtrl._editable) {
			// 		// ...open the scene link editor:
			// 		// const { position, rotation, scene } = scope.sceneLink;
			// 		SceneCtrl.openEditor(SceneCtrl._rightClick, scope.sceneLink, SceneCtrl.sceneLinks);
			// 	} else {
			// 		// ...otherwise just use the default scene link behavior
			// 		// const sceneId = scope.sceneLink.scene;
			// 		// const gotoSceneHandler = data => {
			// 			document.getElementById(`link_${sceneId}`).emit('goto');
			// 			$state.go('scene', { building: scope.scene.parent.code, scene: scope.scene.code });
			// 		// }
			// 		// SceneResource.get({ id: sceneId }).$promise.then(gotoSceneHandler);
			// 	}
			// };
			// SceneResource.get({ id: sceneId }).$promise.then(data => {
			// 	scope.scene = data;
			// 	elem.on('click', elemClick);
			// });
			//
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