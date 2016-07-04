function Settings(store) {
  'ngInject';
  return {
  	appSettings: store.getNamespacedStore('appSettings')
  }
}

export default {
  name: 'Settings',
  fn: Settings
};
