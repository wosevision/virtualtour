function CollectionResource($resource, GLOBAL_SETTINGS) {
  'ngInject';

  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/feature-collections/:id');
}

export default {
  name: 'CollectionResource',
  fn: CollectionResource
};