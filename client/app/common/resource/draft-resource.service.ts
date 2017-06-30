import { GLOBAL_SETTINGS } from '../global.constant';

export class DraftResourceService {
  save: (params: vt.IQueryParams) => any;
  query: (params: vt.IQueryParams) => any;
  get: (params: vt.IQueryParams) => any;
  remove: (params: vt.IQueryParams) => any;
  constructor(
    private $resource
  ) {
    'ngInject';
    return $resource(GLOBAL_SETTINGS.apiUrl + '/drafts/:id', null, {
  		'update': { method: 'PATCH' }
    });
  }
}
