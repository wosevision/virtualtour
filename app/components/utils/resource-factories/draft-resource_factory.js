function DraftResource($resource, GLOBAL_SETTINGS) {
  'ngInject';
  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/drafts/:id', null, {
		'update': { method: 'PATCH' }
  });
}

export default {
  name: 'DraftResource',
  fn: DraftResource
};
