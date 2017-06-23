import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import angulartics from 'angulartics';
import angularticsGa from 'angulartics-google-analytics';

import { DrilldownService } from './drilldown.service';
import { DrilldownComponent } from './drilldown.component';

import './drilldown.scss';

let drilldownModule = angular.module('drilldown', [
  uiRouter,
  ngMaterial,
  angulartics,
	angularticsGa
])

.component('drilldownMenu', DrilldownComponent)
.service('DrilldownService', DrilldownService)

.config(($stateProvider) => {
  'ngInject'

	$stateProvider.state('locations', {
    // parent: 'home',
	  component: 'drilldownMenu',
    // url: '/',
    resolve: {
    	params: ['$transition$', ($transition$) => $transition$.params()],
    	children(DrilldownService) {
    		return DrilldownService.getDrilldown();
    	}
    }
  })
	.state('location', {
		parent: 'locations',
	  url: '/:location',
	  resolve: {
	    currentLocation: ['params', '$tourApi', (params, $tourApi) => {
				return $tourApi.location.query({ 
					filter: {
						code: params.location 
					}
				}).$promise;
	    }],
	    sceneData: ['params', '$aframeScene', '$tourApi', 'currentLocation', (params, $aframeScene, $tourApi, currentLocation) => {
	  		if (currentLocation[0] && currentLocation[0].default) {
					return $tourApi.scene.get({ id: currentLocation[0].default })
						.$promise
						.then(scene => {
							if (!params.building) {
								$aframeScene.scene = scene
							}
						});
	  		}
	    }]
	  }
	})
  .state('location.building', {
    // parent: 'location',
    url: '/:building',
    resolve: {
	    currentBuilding: ['$transition$', '$tourApi', ($transition$, $tourApi) => {
				return $tourApi.building.query({ 
					filter: {
						code: $transition$.params().building 
					}
				}).$promise;
	    }],
	    sceneData: ['params', '$aframeScene', '$tourApi', 'currentBuilding', (params, $aframeScene, $tourApi, currentBuilding) => {
	  		if (currentBuilding[0] && currentBuilding[0].default) {
					return $tourApi.scene.get({ id: currentBuilding[0].default })
						.$promise
						.then(scene => {
							if (!params.scene) {
								$aframeScene.scene = scene
							}
						});
	  		}
	    }]
    }
  })
  .state('location.building.scene', {
    // parent: 'building',
    url: '/:scene',
    resolve: {
	    currentScene: ['$transition$', '$tourApi', 'currentBuilding', ($transition$, $tourApi, currentBuilding) => {
				return $tourApi.scene.query({ 
					filter: {
						code: $transition$.params().scene,
						parent: currentBuilding[0]._id
					}
				}).$promise;
	    }],
	    sceneData: ['params', '$aframeScene', '$tourApi', 'currentScene', (params, $aframeScene, $tourApi, currentScene) => {
	    	console.log(currentScene[0]);
	  		if (currentScene[0] && currentScene[0]._id) {
					return $tourApi.scene.get({ id: currentScene[0]._id })
						.$promise
						.then(scene => $aframeScene.scene = scene);
	  		}
	    }]
    }
  });
})

.name;

export default drilldownModule;
