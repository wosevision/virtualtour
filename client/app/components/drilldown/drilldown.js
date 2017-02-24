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
          children($stateParams, $aframeScene, currentLocation, Tour) {
          	if (!$stateParams.building && !$stateParams.scene && currentLocation[0].default) {
	          	$aframeScene.scene = currentLocation[0].default;
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
            children($stateParams, $aframeScene, currentLocation, currentBuilding, Tour) {
	          	if (!$stateParams.scene && currentBuilding[0].default) {
		          	$aframeScene.scene = currentBuilding[0].default;
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
      				});
            },
            item($aframeScene, currentScene) {
            	return currentScene.$promise.then((data) => {
            		if (data.length === 1 && data[0].panorama) {
			          	$aframeScene.scene = data[0];
            		}
            	});
            }
          }
        });
})

.name;

export default drilldownModule;
