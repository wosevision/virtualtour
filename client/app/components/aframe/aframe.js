import angular from 'angular';

import AframeScene from './scene/scene';
import AframeSky from './sky/sky';
import AframeEntity from './entity/entity';
import AframeEditor from './editor/editor';

let aframeModule = angular.module('aframe', [
  AframeScene,
  AframeSky,
	AframeEntity,
	AframeEditor
])

.name;

export default aframeModule;
