function Entity($resource, GlobalSettings) {
  'ngInject';

  return $resource(GlobalSettings.APP._API_URL + '/entities/:id');
}

export default {
  name: 'Entity',
  fn: Entity
};
