import angular from 'angular';

import { EntityComponent } from './entity.component';
import { EntityControlsComponent } from './entity-controls.component';

export const EntityModule = angular.module('aframe.entity', [])

.component('aframeEntity', EntityComponent)
.component('entityControls', EntityControlsComponent)

.name;
