function Location($resource, GlobalSettings) {
  'ngInject';
  return $resource(GlobalSettings.APP._API_URL + '/locations/:id');
}

export default {
  name: 'Location',
  fn: Location
};