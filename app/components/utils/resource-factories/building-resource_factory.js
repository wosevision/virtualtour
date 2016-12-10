function BuildingResource($resource, GLOBAL_SETTINGS) {
  'ngInject';
  
  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/buildings/:id');
}

export default {
  name: 'BuildingResource',
  fn: BuildingResource
};
