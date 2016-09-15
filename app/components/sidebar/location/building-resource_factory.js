function BuildingResource($resource, GLOBAL_SETTINGS) {
  'ngInject';

  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/buildings/:code', null, { 
  	'get':    {method:'GET', timeout: 10000, cancellable: true },
	  'save':   {method:'POST', timeout: 10000 },
	  'query':  {method:'GET', isArray:true, timeout: 10000, cancellable: true },
	  'remove': {method:'DELETE', timeout: 10000 },
	  'delete': {method:'DELETE', timeout: 10000 }
	});
	
}

export default {
  name: 'BuildingResource',
  fn: BuildingResource
};
