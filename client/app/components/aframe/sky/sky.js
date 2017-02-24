import angular from 'angular';
import skyComponent from './sky.component';
import skyService from './sky.service';

let skyModule = angular.module('aframe.sky', [])

.component('aframeSky', skyComponent)

.service('$aframeSky', skyService)

.name;

export default skyModule;
