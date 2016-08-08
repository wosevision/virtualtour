function SceneResource($resource, GLOBAL_SETTINGS) {
  'ngInject';
  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/scenes/:id?lean');
}

export default {
  name: 'SceneResource',
  fn: SceneResource
};
