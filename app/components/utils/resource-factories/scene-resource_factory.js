function SceneResource($resource, GLOBAL_SETTINGS) {
  'ngInject';
  
  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/scenes/:id', null, {
		'update': { method: 'PATCH' }
  });
}

export default {
  name: 'SceneResource',
  fn: SceneResource
};
