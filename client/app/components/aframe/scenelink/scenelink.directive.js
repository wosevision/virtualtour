import template from './scenelink.html';

function scenelinkDirective($state, $popupWindow, $tourApi, $analytics) {
  'ngInject';
  return {
  	template,
    restrict: 'A',
    scope: {
    	sceneLink: '='
    },
    require: '^aframeScene',
		link(scope, elem, attrs, SceneCtrl) {
			const SceneResource = $tourApi.scene,
						LocationResource = $tourApi.location;
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
			scope.elemClick =  () => {
				// If there's a right click active...
				if (SceneCtrl._rightClick && SceneCtrl._editable) {
					// ...open the scene link editor:
					SceneCtrl.editItem(SceneCtrl._rightClick, scope.sceneLink, SceneCtrl.sceneLinks);
				} else {
					// ...otherwise just use the default scene link behavior
					document.getElementById(`link_${scope.sceneLink._id}`).emit('goto');
					let scene;
					SceneResource.get({ id: scope.sceneLink.scene._id }).$promise
						.then(data => {
							scene = data;
							return LocationResource.get({ id: scene.parent.parent }).$promise;
						}) //**
						.then(location => ({ location, scene }) ) //**
						.then(gotoSceneHandler, errorHandler);
				}
			};
			// elem.on('click', elemClick);
    }
  };
}

export default scenelinkDirective;
