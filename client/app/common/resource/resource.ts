import angular from 'angular';
import ngResource from 'angular-resource';

import { DraftResourceService } from './draft-resource.service';
import { MapResourceService } from './map-resource.service';
import { TourResourceService } from './tour-resource.service';

export const ResourceModule = angular.module('util.resource', [
  ngResource
])

.service('DraftResource', DraftResourceService)

.service('$mapApi', MapResourceService)

.service('$tourApi', TourResourceService)

.name;
