function $tourApi($resource, GLOBAL_SETTINGS) {
  'ngInject';
  return {
  	location: $resource(GLOBAL_SETTINGS.apiUrl + '/locations/:id'),
  	building: $resource(GLOBAL_SETTINGS.apiUrl + '/buildings/:id'),
  	scene: $resource(GLOBAL_SETTINGS.apiUrl + '/scenes/:id', null, {
			'update': { method: 'PATCH' }
	  }),
  	entity: $resource(GLOBAL_SETTINGS.apiUrl + '/entities/:id')
  }
}

export default {
  name: '$tourApi',
  fn: $tourApi
};
