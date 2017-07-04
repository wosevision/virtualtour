import angular from 'angular';

import { SkyComponent } from './sky.component';
import { SkyService } from './sky.service';

export const SkyModule = angular.module('aframe.sky', [])

.component('aframeSky', SkyComponent)

.service('SkyService', SkyService)

.name;
