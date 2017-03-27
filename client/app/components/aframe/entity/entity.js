import angular from 'angular';
import entityComponent from './entity.component';
import entityControlsComponent from './entityControls.component';

const entityModule = angular.module('aframe.entity', [])

.component('aframeEntity', entityComponent)
.component('entityControls', entityControlsComponent)

.name;

export default entityModule;
