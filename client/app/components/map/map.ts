import * as angular from 'angular';
import * as ngMap from 'ngmap';
import uoitCampusMap from 'uoit-campus-map';
import uiRouter from 'angular-ui-router';

import { MapComponent } from './map.component';

import './map.scss';

export const MapModule = angular.module('map', [
  ngMap,
  uiRouter,
  uoitCampusMap
])

.component('uoitMap', MapComponent)

.name;
