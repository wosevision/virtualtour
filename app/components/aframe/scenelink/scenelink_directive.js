function sceneLink($state, SceneResource) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
    	sceneId: '<sceneLink'
    },
    templateUrl: 'aframe/scenelink/_scenelink.html',
		link(scope, element, attrs) {
			attrs.$observe('id', function (id) {
				document.getElementById(id).addEventListener('click', function() {

					SceneResource.get({ id: scope.sceneId }).$promise.then(data => {
						console.log(data);
						$state.go('scene', { building: data.parent.code, scene: data.code });
					});
					
				})
	    })
    }
	    //
  };
}

export default {
  name: 'sceneLink',
  fn: sceneLink
};