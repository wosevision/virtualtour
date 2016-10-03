function LocationConfig($stateProvider) {
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
      // url: '',
      parent: 'home',
      component: 'drilldownMenu',
      resolve: {
      	children(LocationResource) {
      		return LocationResource.query();
      	},
      	nextLevel() {
      		return 'location';
      	}
      },
      // views: {
      //   '@' : {
      //   	controller: 'LocationCtrl',
      //   	controllerAs: 'lc',
      //     template: `<drilldown-menu children="$resolve.children" next-level="location" flex layout-fill></drilldown-menu>`
      //   }
      // },
		  ncyBreadcrumb: {
		  	skip: true,
		  	label: ''
		  }
    })
      .state('location', {
        url: ':location',
      	parent: 'locations',
        // resolve: {
        //   locationCode($stateParams) {
        //     return $stateParams.location;
        //   }
        // },
        component: 'drilldownMenu',
        resolve: {
         //  currentLocation($stateParams, LocationResource) {
      			// return LocationResource.get({id: $stateParams.location });
         //  },
         	params($stateParams) {
         		return $stateParams;
         	},
          currentLocation(params, LocationResource) {
      			return LocationResource.query({ filter: {code: params.location } });
          },
          children(currentLocation, BuildingResource) {
      			return BuildingResource.query({ filter: { parent: currentLocation._id } });
          },
	      	nextLevel() {
	      		return 'building';
	      	},
        },
        // views: {
        //   '@locations' : {
        //     template: '<ui-view/>',
        //     controller($scope, $state, locationCode) {
        //       $scope.lc.current[1] = $scope.lc.locations[locationCode];
        //     }
        //   }
        // },
        // views: {
        //   '@locations' : {
        //   	template: `<drilldown-menu children="$resolve.children" next-level="building" flex layout-fill></drilldown-menu>`
        //   }
        // },
			  ncyBreadcrumb: {
			    // label: '{{ $sc.item.label }}'
			    label: 'Location'
			  }
      })
        .state('building', {
          parent: 'location',
          // url: '/:code',
          // resolve: {
          //   buildingCode($stateParams) {
          //     return $stateParams.code;
          //   },
          //   currentBuilding(BuildingResource, buildingCode) {
          //     return BuildingResource.get({code: buildingCode}).$promise;
          //   }
          // },
          url: '/:building',
          resolve: {
	          currentBuilding($stateParams, BuildingResource) {
      				return BuildingResource.query({ filter: {code: $stateParams.building } });
	          },
            children(currentBuilding, SceneResource) {
      				return SceneResource.query({filter: { parent: currentBuilding._id }});
            }
          },
          // views: {
          //   '@location' : {
          //   	template: '<ui-view/>',
          //     controller($scope, currentBuilding) {
          //     	console.log(currentBuilding);
          //       $scope.lc.current[2] = currentBuilding;
		        //     $scope.mc.activeScene = currentBuilding.default[0];
		        //     $scope.mc.activeScene.sky = [currentBuilding.code, currentBuilding.default[0].code].join('_');
          //     }
          //   }
          // },
	        views: {
	          '@location' : {
	          	template: `<drilldown-menu children="$resolve.children" next-level="scene" flex layout-fill></drilldown-menu>`
	          }
	        },
				  ncyBreadcrumb: {
				    // label: `{{ $sc.item.label }}`
			    	label: 'Building'
				  }
        })
        .state('scene', {
          parent: 'building',
          // url: '/:id',
          url: '/:scene',
          // resolve: {
          //   sceneCode($stateParams) {
          //     return [$stateParams.code, $stateParams.id].join('_');
          //   },
          //   currentScene(SceneResource, sceneCode) {
          //     return SceneResource.get({id: sceneCode}).$promise;
          //   }
          // },
          resolve: {
            sceneCode($stateParams) {
              return [$stateParams.building, $stateParams.scene].join('_');
            },
            currentScene(SceneResource, $stateParams) {
      				return SceneResource.query({ filter: {code: $stateParams.scene } });
            }
          },
          views: {
            '@building' : {
            	template: '<h3>SCENE DETAIL VIEW!</h3>',
		          // controller($scope, sceneCode, currentScene) {
		          //   // $scope.lc.building = currentBuilding;
		          //   $scope.mc.activeScene = currentScene;
		          //   $scope.mc.activeScene.sky = sceneCode;
		          // }
		          controller($aframeScene, currentScene, sceneCode) {
		          	this.$onInit = () => {
		            	$aframeScene.setScene({ scene: currentScene, sky: sceneCode });
		          	}
		          }
            }
          },
				  ncyBreadcrumb: {
				    // label: `{{ lc.current[3].name }}`
			    	label: 'Scene'
				  }
        });
}

export default {
  name: 'LocationConfig',
  fn: LocationConfig
};