import angular from 'angular';
import ngResource from 'angular-resource';

import { DraftResourceFactory } from './draft-resource.service';
import { MapResourceFactory } from './map-resource.service';
import { TourResourceFactory } from './tour-resource.service';

export const ResourceModule = angular.module('util.resource', [
  ngResource
])

.service('DraftResource', DraftResourceFactory)

.service('$mapApi', MapResourceFactory)

.service('$tourApi', TourResourceFactory)

.constant('GLOBAL_SETTINGS', {
	apiUrl: '/api/v1',
	imageApiUrl: '//res.cloudinary.com/uoit-virtual-tour/image/upload'
  // KEYSTONE HEROKU
  // https://virtualtour-cms.herokuapp.com
  // 
  // VTS HEROKU
  // https://virtualtour-server.herokuapp.com
  // 
  // KEYSTONE LOCAL
  // http://localhost:3000/api/v1
  // 
  // VTS LOCAL
  // http://localhost:8080/api\
})

.name;
