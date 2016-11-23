import { fromJson } from 'angular';

function SceneResource($resource, GLOBAL_SETTINGS) {
  'ngInject';
  // return $resource(GLOBAL_SETTINGS.APP._API_URL + '/scenes/:id?lean', null, {
  //   getAll: {
  //     method: 'GET',
  //     isArray: true,
  //     transformResponse(data) {
  //       return fromJson(data).scenes;
  //     }
  //   }
  // });
  return $resource(GLOBAL_SETTINGS.APP._API_URL + '/scenes/:id', null, {
		'update': { method: 'PATCH' }
  });
}

export default {
  name: 'SceneResource',
  fn: SceneResource
};
