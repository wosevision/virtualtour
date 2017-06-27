import * as angular from 'angular';
import { SkyComponent } from './sky.component';
import { SkyService } from './sky.service';

let skyModule = angular.module('aframe.sky', [])

.component('aframeSky', SkyComponent)

.service('$aframeSky', SkyService)

.name;

export default skyModule;
