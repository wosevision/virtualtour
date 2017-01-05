function hotSpot($state, $mapApi, $popupWindow, $analytics) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
    	hotSpot: '='
    },
    require: '^aframeScene',
    templateUrl: 'aframe/hotspot/_hotspot.html',
		link(scope, elem, attrs, SceneCtrl) {
			const FeatureResource = $mapApi.feature;
			const hotspotId = scope.hotSpot._id;

			//  and handlers: success...
			const viewHotspot = data => {
				const { category, desc, href, name } = data.properties,
							locals = { type: 'hotspot', category, desc, href, name };
				document.getElementById(`hotSpot_${hotspotId}`).emit('goto');
				$analytics.eventTrack('click', { category: 'hotspot', label: hotspotId });
				return $popupWindow.info({ locals });
			}
			// ...and error
			const errorHandler = error => {
			  const locals = {
					type: 'Hotspot load error!',
					message: 'Looks like this hotspot is broken – darn.'
		  	}
				$popupWindow.error({ locals });
			}

			// Listen for clicks on scene link element
			const elemClick = () => {
				// If there's a right click active...
				if (SceneCtrl._rightClick && SceneCtrl._editable) {
					// ...open the scene link editor:
					SceneCtrl.openEditor(SceneCtrl._rightClick, scope.hotSpot, SceneCtrl.hotSpots);
				} else {
					if (scope.hotSpot.linked && scope.hotSpot.feature) {
						FeatureResource.get({
							id: scope.hotSpot.feature
						}).$promise
							.then(data => viewHotspot(data), errorHandler)
							.then(result => {
								// ...
							});
					} else {
						viewHotspot(scope.hotSpot)
							.then(result => {
								// ...
							});
					}
				}
			};
			elem.on('click', elemClick);
			
			// Scope cleanup on $destroy
			scope.$on('$destroy', () => {
				elem.off('click', elemClick);
			});
			//
    }
	  //
  };
}

export default {
  name: 'hotSpot',
  fn: hotSpot
};