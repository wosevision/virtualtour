function BuildingResource($resource, GLOBAL_SETTINGS) {
  'ngInject';
  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/buildings/:code');
}

export default {
  name: 'BuildingResource',
  fn: BuildingResource
};
