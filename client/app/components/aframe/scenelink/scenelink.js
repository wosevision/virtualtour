import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angulartics from 'angulartics';
import angularticsGa from 'angulartics-google-analytics';
import scenelinkDirective from './scenelink.directive';

const scenelinkModule = angular.module('aframe.scenelink', [
  uiRouter,
  angulartics,
	angularticsGa
])

.directive('sceneLink', scenelinkDirective)

.name;

export default scenelinkModule;
