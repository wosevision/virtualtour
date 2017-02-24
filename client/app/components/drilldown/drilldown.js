import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import angulartics from 'angulartics';
import angularticsGa from 'angulartics-google-analytics';

import drilldownComponent from './drilldown.component';


let drilldownModule = angular.module('drilldown', [
  uiRouter,
  ngMaterial,
  angulartics,
	angularticsGa
])

.component('drilldownMenu', drilldownComponent)

.config(($stateProvider) => {
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
      	Tour: '$tourApi',
      	children(Tour) {
      		return Tour.location.query({
  					sort: 'name'
  				}).$promise;
      	},
      	nextLevel() {
      		return 'location';
      	}
      }
    })
      .state('location', {
      	parent: 'locations',
        url: ':location',
        component: 'drilldownMenu',
        resolve: {
          currentLocation($stateParams, Tour) {
      			return Tour.location.query({ 
      				filter: {
      					code: $stateParams.location 
      				}
      			}).$promise;
          },
          sceneData(currentLocation, Tour) {
        		if (currentLocation[0] && currentLocation[0].default) {
      				return Tour.scene.get({ id: currentLocation[0].default }).$promise;
        		}
          },
          children($stateParams, $aframeScene, currentLocation, sceneData, Tour) {
          	if (!$stateParams.building && !$stateParams.scene && sceneData) {
	          	$aframeScene.scene = sceneData;
	          }
      			return Tour.building.query({
      				filter: {
      					parent: currentLocation[0]._id
      				},
      				sort: 'name'
      			}).$promise;
          },
	      	nextLevel(children) {
	      		return 'building';
	      	}
        }
      })
        .state('building', {
          parent: 'location',
          url: '/:building',
        	component: 'drilldownMenu',
          resolve: {
	          currentBuilding($stateParams, Tour) {
      				return Tour.building.query({
      					filter: {
      						code: $stateParams.building
      					}
      				}).$promise;
	          },
            sceneData(currentBuilding, Tour) {
          		if (currentBuilding[0] && currentBuilding[0].default) {
	      				return Tour.scene.get({ id: currentBuilding[0].default }).$promise;
          		}
            },
            children($stateParams, $aframeScene, currentLocation, currentBuilding, sceneData, Tour) {
	          	if (!$stateParams.scene && sceneData) {
		          	$aframeScene.scene = sceneData;
	            }
      				return Tour.scene.query({
      					filter: {
      						parent: currentBuilding[0]._id
      					},
      					sort: 'name'
      				}).$promise;
            },
		      	nextLevel() {
		      		return 'scene';
		      	}
          }
        })
        .state('scene', {
          parent: 'building',
          url: '/:scene',
          resolve: {
            currentScene($stateParams, currentBuilding, Tour) {
      				return Tour.scene.query({
      					filter: {
      						code: $stateParams.scene,
      						parent: currentBuilding[0]._id
      					}
      				}).$promise;
            },
            sceneData(currentScene, Tour) {
          		if (currentScene.length === 1 && currentScene[0]._id) {
	      				return Tour.scene.get({ id: currentScene[0]._id }).$promise;
          		}
            },
            item($aframeScene, sceneData) {
          		if (sceneData && sceneData.panorama) {
		          	$aframeScene.scene = sceneData;
          		}
	          	return sceneData;
            }
          }
        });
})

.name;

export default drilldownModule;
