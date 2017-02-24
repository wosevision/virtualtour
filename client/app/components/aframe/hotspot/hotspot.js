import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angulartics from 'angulartics';
import angularticsGa from 'angulartics-google-analytics';
import hotspotDirective from './hotspot.directive';

const hotspotModule = angular.module('aframe.hotspot', [
  uiRouter,
  angulartics,
	angularticsGa
])

.directive('hotSpot', hotspotDirective)

.name;

export default hotspotModule;
