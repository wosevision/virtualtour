import { Inject, Injectable } from 'ng-metadata/core';

import { GLOBAL_SETTINGS } from '../global.constant';

@Injectable()
export class DraftResourceService {
  save: (params: vt.IQueryParams) => any;
  query: (params: vt.IQueryParams) => any;
  get: (params: vt.IQueryParams) => any;
  remove: (params: vt.IQueryParams) => any;
  constructor(
    @Inject('$resource') private $resource
  ) {
    'ngInject';
    return this.$resource(GLOBAL_SETTINGS.apiUrl + '/drafts/:id', null, {
  		'update': { method: 'PATCH' }
    });
  }
}
