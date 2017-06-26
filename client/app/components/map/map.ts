import * as angular from 'angular';
import ngMap from 'ngmap';
import uiRouter from 'angular-ui-router';
import uoitCampusMap from 'uoit-campus-map';

import { MapComponent } from './map.component';

import './map.scss';

export const MapModule = angular.module('map', [
  ngMap,
  uiRouter,
  uoitCampusMap
])

.component('uoitMap', MapComponent)

.name;
