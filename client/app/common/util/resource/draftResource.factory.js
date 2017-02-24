function DraftResourceFactory($resource, GLOBAL_SETTINGS) {
  'ngInject';
  
  return $resource(GLOBAL_SETTINGS.apiUrl + '/drafts/:id', null, {
		'update': { method: 'PATCH' }
  });
}

export default DraftResourceFactory;
