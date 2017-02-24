import angular from 'angular';

import AframeScene from './scene/scene';
import AframeSky from './sky/sky';
import AframeSceneLink from './scenelink/scenelink';
import AframeHotSpot from './hotspot/hotspot';
import AframeEditor from './editor/editor';
import AframeEntity from './entity/entity';

let aframeModule = angular.module('aframe', [
  AframeScene,
  AframeSky,
	AframeSceneLink,
	AframeHotSpot,
	AframeEditor,
	AframeEntity
])

.name;

export default aframeModule;
