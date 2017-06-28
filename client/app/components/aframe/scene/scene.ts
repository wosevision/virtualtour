import angular from 'angular';

import { SceneComponent } from './scene.component';
import { SceneService } from './scene.service';

import './scene.scss';

export const SceneModule = angular.module('aframe.scene', [])

.component('aframeScene', SceneComponent)

.service('$aframeScene', SceneService)

.name;
