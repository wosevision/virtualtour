function LocationResource($resource, GLOBAL_SETTINGS) {
  'ngInject';

  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/locations/:id');
}

export default {
  name: 'LocationResource',
  fn: LocationResource
};
