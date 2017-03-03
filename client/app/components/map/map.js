import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMap from 'ngmap';
import uoitCampusMap from 'uoit-campus-map';

// import mapComponent from './map.component';
import template from './map.html';
import controller from './map.controller';
import './map.scss';

let mapModule = angular.module('map', [
  uiRouter,
  ngMap,
  uoitCampusMap
])

// .component('uoitMap', mapComponent)

.config(($stateProvider) => {
  'ngInject'
	$stateProvider
    .state('map', {
      parent: 'home',
      // component: 'uoitMap'
      template,
			controller,
			bindToController: true,
			controllerAs: '$ctrl'
    });
})

.name;

export default mapModule;
