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
      url: '',
      parent: 'home',
      views: {
        '@' : {
          template: `<location-menu></location-menu>`
        }
      },
		  ncyBreadcrumb: {
		  	skip: true,
		  	label: ''
		  }
    })
      .state('buildings', {
        url: ':location',
      	parent: 'locations',
        // params: { location: null },
            resolve: {
              currentLocation($stateParams) {
                return $stateParams.location;
              },
              buildingList(LocationResource, currentLocation) {
                return LocationResource.query({location: currentLocation}).$promise;
              }
            },
        views: {
          '@locations' : {
            templateUrl: 'sidebar/location/_location-building.html',
            controller($scope, $state, currentLocation, buildingList) {
              $scope.lc.location = {
              	label: $scope.lc.locations[currentLocation].label,
              	buildings: buildingList.reduce( alphaGroupReducer, {} )
              }
            }
          }
        },
			  ncyBreadcrumb: {
			    label: '{{ lc.location.label }} location'
			  }
      })
        .state('scenes', {
          url: '/:code',
          parent: 'buildings',
          // url: '/:code/:id',
          // parent: 'home',
              resolve: {
	              currentBuilding($stateParams) {
	                return $stateParams.code;
	              },
                sceneList(LocationResource, currentBuilding) {
                  return LocationResource.get({code: currentBuilding}).$promise;
                }
              },
          views: {
            '@buildings' : {
              templateUrl: 'sidebar/location/_location-building-scene.html',
              controller($scope, sceneList) {
                $scope.lc.building = sceneList.location;
              }
            }
          },
				  ncyBreadcrumb: {
				    label: `{{ lc.building.name }}`
				  }
        })
        .state('scene', {
          url: '/:id',
          parent: 'scenes',
              resolve: {
	              currentScene($stateParams) {
	                return $stateParams.id;
	              },
                sceneResolve(SceneResource, currentScene) {
                  return SceneResource.get({id: currentScene}).$promise;
                }
              },
          views: {
            '@buildings' : {
              templateUrl: 'sidebar/location/_location-building-scene.html',
              controller($scope, sceneResolve, sceneList) {
                console.log(sceneList);
                $scope.lc.building = sceneList.location;
                $scope.mc.activeScene = sceneResolve.scene;
              }
            }
          },
				  ncyBreadcrumb: {
				    label: `{{ mc.activeScene.name }}`
				  }
        });
}

export default {
  name: 'LocationConfig',
  fn: LocationConfig
};