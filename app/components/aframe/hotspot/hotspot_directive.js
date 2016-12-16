function hotSpot($state, $mapApi, $analytics) {
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
			const viewHotspotHandler = data => {
				$analytics.eventTrack('click', { category: 'hotspot', label: hotspotId });
				document.getElementById(`hotSpot_${hotspotId}`).emit('goto');
				console.log(data);
			}
			// ...and error
			const errorHandler = error => {
			  const locals = {
					type: 'Hotspot load error!',
					message: 'Looks like this hotspot is broken – darn.'
		  	}
				$ErrorReporter.error({ locals });
			}
			//
			// Listen for clicks on scene link element
			const elemClick =  event => {
				// const { position, desc, feature } = scope.hotSpot;
				// If there's a right click active...
				if (SceneCtrl._rightClick && SceneCtrl._editable) {
					// ...open the scene link editor:
					SceneCtrl.openEditor(SceneCtrl._rightClick, scope.hotSpot, SceneCtrl.hotSpots);
				} else {
					if (scope.hotSpot.linked && scope.hotSpot.feature) {
						FeatureResource.get({ id: scope.hotSpot.feature }).$promise.then(viewHotspotHandler, errorHandler);
					} else {
						viewHotspotHandler(scope.hotSpot);
					}
				}
			};
			elem.on('click', elemClick);
			//
			// Scope cleanup on $destroy
			scope.$on('$destroy', () => {
				elem.off('click');
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