import angular from 'angular';

import AframeScene from './scene/scene';
import AframeSky from './sky/sky';
import AframeEntity from './entity/entity';

let aframeModule = angular.module('aframe', [
  AframeScene,
  AframeSky,
	AframeEntity
])

.name;

export default aframeModule;
