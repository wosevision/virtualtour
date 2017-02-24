import angular from 'angular';
import ngResource from 'angular-resource';

import DraftResourceFactory from './draftResource.factory';
import MapResourceFactory from './mapResource.factory';
import TourResourceFactory from './tourResource.factory';

let resourceModule = angular.module('util.resource', [
  ngResource
])

.factory('DraftResource', DraftResourceFactory)

.factory('$mapApi', MapResourceFactory)

.factory('$tourApi', TourResourceFactory)

.constant('GLOBAL_SETTINGS', {
	apiUrl: 'http://localhost:3000/api/v1',
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

export default resourceModule;
