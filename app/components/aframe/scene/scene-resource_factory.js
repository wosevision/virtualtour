function SceneResource($resource, GLOBAL_SETTINGS) {
  'ngInject';
  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/scenes/:id?lean', null, {
    getAll: {
      method: 'GET',
      isArray: true,
      transformResponse: function(data) {
        return angular.fromJson(data).scenes;
      }
    }
  });
}

export default {
  name: 'SceneResource',
  fn: SceneResource
};
