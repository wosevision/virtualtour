export class DraftResourceFactory {
  constructor($resource, GLOBAL_SETTINGS) {
    'ngInject';
    return $resource(GLOBAL_SETTINGS.apiUrl + '/drafts/:id', null, {
  		'update': { method: 'PATCH' }
    });
  }
}
