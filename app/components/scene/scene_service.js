function Scene($resource, GlobalSettings) {
  'ngInject';
  return $resource(GlobalSettings.APP._API_URL + '/scenes/:id');
}

export default {
  name: 'Scene',
  fn: Scene
};
