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
  				}).$promise;
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
          children($stateParams, $aframeScene, currentLocation, BuildingResource) {
          	if (!$stateParams.building && !$stateParams.scene) {
          		const { sceneLinks, hotSpots, panorama } = currentLocation[0].default;
	          	$aframeScene.scene = {
	          		sceneLinks,
	          		hotSpots,
	          		sky: [ panorama.version, panorama.public_id].join('/')
	          	};
	          }

      			return BuildingResource.query({
      				filter: {
      					parent: currentLocation[0]._id
      				},
      				sort: 'name'
      			}).$promise;
          },
	      	nextLevel(children) {
	      		return 'building';
	      	}
        },
			  ncyBreadcrumb: {
			    label: '{{ this.item.label || "Location" }}'
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
            children($stateParams, $aframeScene, currentLocation, currentBuilding, SceneResource) {
          		const { sceneLinks, hotSpots, panorama } = currentBuilding[0].default;
	          	if (!$stateParams.scene) {
		          	$aframeScene.scene = {
		          		sceneLinks,
		          		hotSpots,
		          		sky: [ panorama.version, panorama.public_id].join('/')
		          	};
	            }

      				return SceneResource.query({
      					filter: {
      						parent: currentBuilding[0]._id
      					},
      					sort: 'name'
      				}).$promise;
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
            currentScene($stateParams, currentBuilding, SceneResource) {
      				return SceneResource.query({
      					filter: {
      						code: $stateParams.scene,
      						parent: currentBuilding[0]._id
      					}
      				});
            },
            item($aframeScene, currentScene) {
            	return currentScene.$promise.then((data) => {
            		console.log(data[0]);
          			const { sceneLinks, hotSpots, panorama } = data[0];
		          	$aframeScene.scene = {
		          		sceneLinks,
		          		hotSpots,
		          		sky: [ panorama.version, panorama.public_id].join('/')
		          	};
            	});
            }
          },
				  ncyBreadcrumb: {
			    	label: '{{ this.item.label || "Scene" }}'
				  }
        });
}

export default {
  name: 'DrilldownConfig',
  fn: DrilldownConfig
};