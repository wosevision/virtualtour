/**
 * A-FRAME SCENE DIRECTIVE
 * Converts arrays of standardized objects to A-Frame
 * compatible DOM elements via the aframeEntity directive
 * and manages their lifecycles in the context of a scene
 * 
 * @param  {Function} $compile     DI: compiler service
 * @param  {Function} $aframeScene DI: scene service
 * @return {Object}                Scene definition object
 */
function aframeScene($compile, $aframeScene) {
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      sky: '@',
      scene: '=?'
    },
    controller: 'SceneCtrl',
    // controllerAs: 'scene',
   	templateUrl: 'aframe/scene/_scene.html',
    transclude: true,
		link(scope, element, attributes, c, t, $aframeScene) {

			/**
			 * Cache vars for <a-scene> and <a-assets>
			 * Store JQLite-wrapped DOM elements
			 * 
			 * @type {Element}
			 * @type {Element}
			 */
    	const $scene = element.find('a-scene');
    	const $assets = $scene.find('a-assets');

			/**
			 * Cache vars to store JQLite <img> and <a-sky>
			 * Flag for init sky load and array of loaded skies
			 * 
			 * @type {null}
			 * @type {null}
			 * @type {boolean}
			 * @type {Array}
			 */
			let $sky,
					$skyAsset,
					skyLoaded = false;
			const skyLoadedList = [];

			/**
			 * Compiles a new <a-sky> and binds to scope.sky
			 * Flags sky element as loaded
			 * 
			 * @param  {string} sky ID for asset reference
			 * @return {Element}    JQLite-wrapped <a-sky> element
			 */
			function loadSky() {
				return $compile('<a-sky ng-src="{{ \'#\' + loadedSky }}" />')(scope, clone => {
					$scene.append(clone);
					skyLoaded = true;
					return clone;
				});
			}

			/**
			 * Compiles a new image asset with requested code
			 * Adds element to assets and ID to list to prevent reload
			 * 
			 * @param  {string}   asset ID for asset reference
			 * @param  {Function} cb    Callback after load
			 * @return {Element}        JQLite-wrapped <img> element
			 */
			function loadSkyAsset(skyUrl, cb) {

  			// const assetPath = `api/panoramas/${ asset.split('_').join('/') }.jpg`;
  			const assetId = skyUrl.split('/scenes/panorama/')[1].split('.')[0];

				// return $compile(`<img src="${ assetPath }" id="${ asset }" />`)(scope, function (clone) {
				return $compile(`<img src="${ skyUrl }" id="${ assetId }" crossOrigin="anonymous" />`)(scope, function (clone) {
	        clone.on('load', event => {
	          scope.$apply(() => {
							$assets.append(clone);
							skyLoadedList.push(skyUrl);
							cb(assetId);
	          });
						return clone;
	        });
				});
			}

      /**
       * Checks if sky ID exists and is not already loaded
       * Loads <img> asset with loadSkyAsset() and saves
       * Loads <a-sky> entity with loadSky() and saves
       * 
       * @param  {string} sky ID for asset reference
       * @return {void}				No return
       */
      function handleSkyWatch(skyUrl) {
        if (skyUrl) {
	  			const skyId = skyUrl.split('/scenes/panorama/')[1].split('.')[0];
        	if (!skyLoadedList.includes(skyId)) {
	          $skyAsset = loadSkyAsset(skyUrl, () => {
			        scope.loadedSky = skyId;
	            if(!skyLoaded) {
	              $sky = loadSky();
	            }
	          });
	        } else {
		        scope.loadedSky = skyId;
	        }
	      }
        // else if (attributes.defaultScene) {
	      	// scope.sky = attributes.defaultScene;
        // }
      }
      scope.$watch('sky', handleSkyWatch); // location/building/scene

      // scope.$watch(
      // 	// ON-THE-FLY SCENE ID GRABBER
      // 	() => $aframeScene.getScene(), 
      // 	(newScene, oldScene) => {
      //     if (!angular.isUndefined(newScene) && !angular.equals(oldScene, newScene)) {
      //       // scope.assets = newScene.assets;
      //       // scope.entities = newScene.entities;
      //     }
      // 	}
      // );


	  }
	  //  ^ ^ ^ ^ ^ ^ 
	  // END OF link()
  };
}

export default {
  name: 'aframeScene',
  fn: aframeScene
};
