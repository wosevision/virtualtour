import { element } from 'angular';

function sceneLink($state, $mdPanel, SceneResource) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
    	sceneLink: '='
    },
    templateUrl: 'aframe/scenelink/_scenelink.html',
		link(scope, elem, attrs) {
			//
			// Get some vars queued up
			// $element-wrapped <a-scene> and click type checker
			let $scene = element(elem[0].sceneEl),
					rightClick = false, panelRef;
			//
			//
			// Listen for right clicks on entire scene
			const contextMenu = ev => {
	      ev.stopPropagation();
				if (!rightClick) {
					rightClick = ev;
					ev.preventDefault();
					$scene.on('mouseup', () => {
						rightClick = false;
						$scene.off('mouseup')
					});
				}
			};
			$scene.on('contextmenu', contextMenu);
			//
			//
			// Listen for clicks on scene link element
			const elemClick =  event => {
				const sceneId = scope.sceneLink.scene;
				// If there's no right click active...
				if (!rightClick) {
					// ...then just use the default scene link behavior
					SceneResource.get({ id: sceneId }).$promise.then(data => {
						document.getElementById(`link_${sceneId}`).emit('goto');
						$state.go('scene', { building: data.parent.code, scene: data.code });
					});
				} else {
					// Otherwise, open the scene link editor
					// 
					// Animation to open dialog from and close to right click
					// Position to hold in bottom left of screen
			    const animation = $mdPanel.newPanelAnimation()
		        .openFrom({top: rightClick.clientY - 150, left: rightClick.clientX})
		        .withAnimation($mdPanel.animation.SCALE)
		        .closeTo({top: rightClick.clientY - 150, left: rightClick.clientX});
					const position = $mdPanel.newPanelPosition()
		        .absolute()
		        .bottom(0)
		        .left(0);
		      // Build dialog config
					const config = {
						attachTo: angular.element(document.body),
						templateUrl: 'aframe/scenelink/_scenelink-editor.html',
						panelClass: 'demo-menu-example',
						controller: 'LinkEditorCtrl',
					  bindToController: true,
					  controllerAs: '$ctrl',
						locals: {
							sceneLink: scope.sceneLink
						},
						clickOutsideToClose: true,
						escapeToClose: true,
						focusOnOpen: true,
						zIndex: 85,
						onDomRemoved() {
							panelRef&&panelRef.destroy();
						},
						position,
						animation
					};
			    $mdPanel.open(config)
		        .then(result => {
		          panelRef = result;
		        });
				}
			};
			elem.on('click', elemClick);
			//
			//
			// Scope cleanup on $destroy
			scope.$on('$destroy', () => {
				panelRef&&panelRef.destroy();
				elem.off('click');
				$scene.off('contextmenu');
			});
			//
    }
	  //
  };
}

export default {
  name: 'sceneLink',
  fn: sceneLink
};