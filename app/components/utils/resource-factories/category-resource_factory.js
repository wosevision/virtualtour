function CategoryResource($resource, GLOBAL_SETTINGS) {
  'ngInject';

  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/categories/:id');
}

export default {
  name: 'CategoryResource',
  fn: CategoryResource
};