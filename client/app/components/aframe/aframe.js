import angular from 'angular';

import 'aframe';
import 'aframe-event-set-component';
import 'aframe-reverse-look-controls-component';
import 'aframe-look-at-component';
import 'aframe-text-component';
import 'aframe-mouse-cursor-component';
import { primitives, loaders } from 'aframe-extras';
loaders.registerAll();
primitives.registerAll();

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
