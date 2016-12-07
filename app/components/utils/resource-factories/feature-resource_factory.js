function FeatureResource($resource, GLOBAL_SETTINGS) {
  'ngInject';

  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/features/:id');
}

export default {
  name: 'FeatureResource',
  fn: FeatureResource
};