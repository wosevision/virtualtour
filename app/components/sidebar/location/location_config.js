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
        	controller: 'LocationCtrl',
        	controllerAs: 'lc',
          template: `<drilldown-menu children="lc.locations" on-toggle="lc.onToggle"></drilldown-menu><ui-view/>`
        }
      },
		  ncyBreadcrumb: {
		  	skip: true,
		  	label: ''
		  }
    })
     //  .state('buildings', {
     //    url: ':location',
     //  	parent: 'locations',
     //    // params: { location: null },
     //        resolve: {
     //          locationCode($stateParams) {
     //            return $stateParams.location;
     //          },
     //          buildingList(BuildingResource, locationCode) {
     //            return BuildingResource.query({location: locationCode}).$promise;
     //          }
     //        },
     //    views: {
     //      '@locations' : {
     //        templateUrl: 'sidebar/location/_location-building.html',
     //        controller($scope, $state, locationCode, buildingList) {
     //          $scope.lc.location = {
     //          	label: $scope.lc.locations[locationCode].label,
     //          	buildings: buildingList.reduce( alphaGroupReducer, {} )
     //          }
     //        }
     //      }
     //    },
			  // ncyBreadcrumb: {
			  //   label: '{{ lc.location.label }} location'
			  // }
     //  })
     //    .state('scenes', {
     //      url: '/:code',
     //      parent: 'buildings',
     //      // url: '/:code/:id',
     //      // parent: 'home',
     //          resolve: {
	    //           buildingCode($stateParams) {
	    //             return $stateParams.code;
	    //           },
     //            currentBuilding(BuildingResource, buildingCode) {
     //              return BuildingResource.get({code: buildingCode}).$promise;
     //            },
     //            sceneList(SceneResource, buildingCode) {
     //              return SceneResource.get({id: buildingCode}).$promise.then(function(data) {
     //              	return data.scenes;
     //              });
     //            }
     //          },
     //      views: {
     //        '@buildings' : {
     //          templateUrl: 'sidebar/location/_location-building-scene.html',
     //          controller($scope, currentBuilding, sceneList) {
     //            $scope.lc.building = currentBuilding;
     //            $scope.lc.building.scenes = sceneList;
     //          }
     //        }
     //      },
				 //  ncyBreadcrumb: {
				 //    label: `{{ lc.building.name }}`
				 //  }
     //    })
     //    
     //    
     //    
      //   .state('scene', {
      //     url: '/:id',
      //     // parent: 'scenes',
      //     parent: 'locations',
      //         resolve: {
	     //          sceneCode($stateParams, buildingCode) {
	     //            return `${ buildingCode }_${ $stateParams.id }`;
	     //          },
      //           currentScene(SceneResource, sceneCode) {
      //             return SceneResource.get({id: sceneCode}).$promise;
      //           }
      //         },
      //     views: {
      //       '@buildings' : {
      //         templateUrl: 'sidebar/location/_location-building-scene.html',
      //         controller($scope, currentBuilding, sceneCode, currentScene, sceneList) {
      //           console.log(sceneList);
      //           $scope.lc.building = currentBuilding;
      //           $scope.mc.activeScene = currentScene;
      //           $scope.mc.activeScene.sky = sceneCode;
      //         }
      //       }
      //     },
				  // ncyBreadcrumb: {
				  //   label: `{{ mc.activeScene.name }}`
				  // }
      //   });
      .state('location', {
        url: ':location',
      	parent: 'locations',
        // params: { location: null },
            resolve: {
              locationCode($stateParams) {
                return $stateParams.location;
              }
            },
        views: {
          '@locations' : {
            template: '<ui-view/>',
            controller($scope, $state, locationCode) {
              $scope.lc.current[1] = $scope.lc.locations[locationCode];
            }
          }
        },
			  ncyBreadcrumb: {
			    label: '{{ lc.current[1].name }} location'
			  }
      })
        .state('building', {
          url: '/:code',
          parent: 'location',
              resolve: {
	              buildingCode($stateParams) {
	                return $stateParams.code;
	              },
                currentBuilding(BuildingResource, buildingCode) {
                  return BuildingResource.get({code: buildingCode}).$promise;
                }
              },
          views: {
            '@location' : {
            	template: '<ui-view/>',
              controller($scope, currentBuilding) {
                $scope.lc.current[2] = currentBuilding;
              }
            }
          },
				  ncyBreadcrumb: {
				    label: `{{ lc.current[2].name }}`
				  }
        })
        .state('scene', {
          // url: ':code/:id',
          url: '/:id',
          parent: 'building',
          // parent: 'locations',
              resolve: {
	              sceneCode($stateParams) {
	                return [$stateParams.code, $stateParams.id].join('_');
	              },
                currentScene(SceneResource, sceneCode) {
                  return SceneResource.get({id: sceneCode}).$promise;
                }
              },
          views: {
            '@building' : {
            	template: '',
		          controller($scope, sceneCode, currentScene) {
		            // $scope.lc.building = currentBuilding;
		            $scope.mc.activeScene = currentScene;
		            $scope.mc.activeScene.sky = sceneCode;
		          }
            }
          },
				  ncyBreadcrumb: {
				    label: `{{ lc.current[3].name }}`
				  }
        });
}

export default {
  name: 'LocationConfig',
  fn: LocationConfig
};