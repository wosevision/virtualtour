import angular from 'angular';

import { SceneModule } from './scene/scene';
import { SkyModule } from './sky/sky';
import { EntityModule } from './entity/entity';

export const AFrameModule = angular.module('aframe', [
  SceneModule,
  SkyModule,
	EntityModule
])

.name;
