function $tourApi($resource, GLOBAL_SETTINGS) {
  'ngInject';
  return {
  	location: $resource(GLOBAL_SETTINGS.APP._API_URL + '/locations/:id'),
  	building: $resource(GLOBAL_SETTINGS.APP._API_URL + '/buildings/:id'),
  	scene: $resource(GLOBAL_SETTINGS.APP._API_URL + '/scenes/:id', null, {
			'update': { method: 'PATCH' }
	  }),
  	entity: $resource(GLOBAL_SETTINGS.APP._API_URL + '/entities/:id')
  }
}

export default {
  name: '$tourApi',
  fn: $tourApi
};
