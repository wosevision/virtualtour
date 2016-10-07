function EntityResource($resource, GLOBAL_SETTINGS) {
  'ngInject';

  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/entities/:id');
}

export default {
  name: 'EntityResource',
  fn: EntityResource
};
