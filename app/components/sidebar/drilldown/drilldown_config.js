function DrilldownConfig($stateProvider) {
  'ngInject'

  function alphaGroupReducer(output, name) {
    let lCase = name.name.toUpperCase();
    if (output[lCase[0]]) //if lCase is a key
      output[lCase[0]].push(name); //Add name to its list
    else
      output[lCase[0]] = [name]; // Else add a key
    return output;
  }

	$stateProvider
    .state('locations', {
      parent: 'home',
      url: '/',
      component: 'drilldownMenu',
      resolve: {
      	LocationResource: 'LocationResource',
      	children(LocationResource) {
      		return LocationResource.query({
  					sort: 'name'
  				});
      	},
      	nextLevel() {
      		return 'location';
      	}
      },
		  ncyBreadcrumb: {
		  	skip: true,
		  	label: ''
		  }
    })
      .state('location', {
      	parent: 'locations',
        url: ':location',
        component: 'drilldownMenu',
        resolve: {
      		BuildingResource: 'BuildingResource',
          currentLocation($stateParams, LocationResource) {
      			return LocationResource.query({ 
      				filter: {
      					code: $stateParams.location 
      				}
      			}).$promise;
          },
          children($aframeScene, currentLocation, BuildingResource) {

          	$aframeScene.scene = {
          		scene: currentLocation[0].default, 
          		sky: currentLocation[0].default.panorama.url
          		// [
          		// 	currentLocation[0].code,
          		// 	'ext',
          		// 	currentLocation[0].default.code
          		// ].join('_')
          	};

      			return BuildingResource.query({
      				filter: {
      					parent: currentLocation[0]._id
      				},
      				sort: 'name'
      			});
          },
	      	nextLevel(children) {
	      		// console.log(children);
	      		return 'building';
	      	}
        },
			  ncyBreadcrumb: {
			    label: '{{ this.item.label || "Location" }}'
			    // label: 'Location'
			  }
      })
        .state('building', {
          parent: 'location',
          url: '/:building',
        	component: 'drilldownMenu',
          resolve: {
      			SceneResource: 'SceneResource',
	          currentBuilding($stateParams, BuildingResource) {
      				return BuildingResource.query({
      					filter: {
      						code: $stateParams.building
      					}
      				}).$promise;
	          },
            children($aframeScene, currentLocation, currentBuilding, SceneResource) {

            	$aframeScene.scene = {
            		scene: currentBuilding[0].default, 
            		sky: currentBuilding[0].default.panorama.url
            		// [
            		// 	currentLocation[0].code,
            		// 	currentBuilding[0].code,
            		// 	currentBuilding[0].default.code
            		// ].join('_')
            	};

      				return SceneResource.query({
      					filter: {
      						parent: currentBuilding[0]._id
      					},
      					sort: 'name'
      				});
            },
		      	nextLevel() {
		      		return 'scene';
		      	}
          },
				  ncyBreadcrumb: {
			    	label: '{{ this.item.label || "Building" }}'
				  }
        })
        .state('scene', {
          parent: 'building',
          url: '/:scene',
          resolve: {
            sceneCode($stateParams) {
            	return [$stateParams.location, $stateParams.building, $stateParams.scene].join('_');
            },
            currentScene($stateParams, currentBuilding, SceneResource) {
      				return SceneResource.query({
      					filter: {
      						code: $stateParams.scene,
      						parent: currentBuilding._id
      					}
      				});
            },
            item($aframeScene, sceneCode, currentScene) {
            	// console.log(skyCode);
            	return currentScene.$promise.then((data) => {
            		const sceneData = {
	            		scene: data[0],
	            		sky: data[0].panorama.url//sceneCode
	            	};
	            	$aframeScene.scene = sceneData;
	            	return sceneData;
            	});
            }
          },
          component: 'drilldownContent',
				  ncyBreadcrumb: {
			    	label: '{{ this.item.label || "Scene" }}'
				  }
        });
}

export default {
  name: 'DrilldownConfig',
  fn: DrilldownConfig
};