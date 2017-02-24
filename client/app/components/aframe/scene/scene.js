import angular from 'angular';
import sceneComponent from './scene.component';
import sceneService from './scene.service';

const sceneModule = angular.module('aframe.scene', [])

.component('aframeScene', sceneComponent)

.service('$aframeScene', sceneService)

.name;

export default sceneModule;
