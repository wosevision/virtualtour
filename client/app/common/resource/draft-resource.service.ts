import { GLOBAL_SETTINGS } from '../global.constant';

export class DraftResourceService {
  constructor(
    private $resource
  ) {
    'ngInject';
    return $resource(GLOBAL_SETTINGS.apiUrl + '/drafts/:id', null, {
  		'update': { method: 'PATCH' }
    });
  }
}
