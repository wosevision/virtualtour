function $mapApi($resource, GLOBAL_SETTINGS) {
  'ngInject';
  return {
  	category: $resource(GLOBAL_SETTINGS.APP._API_URL + '/categories/:id'),
  	feature: $resource(GLOBAL_SETTINGS.APP._API_URL + '/features/:id'),
  	collection: $resource(GLOBAL_SETTINGS.APP._API_URL + '/feature-collections/:id')
  }
}

export default {
  name: '$mapApi',
  fn: $mapApi
};
