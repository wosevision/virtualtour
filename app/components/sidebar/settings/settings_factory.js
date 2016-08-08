function SettingsFactory(store) {
  'ngInject';
  return {
  	appSettings: store.getNamespacedStore('appSettings')
  }
}

export default {
  name: 'SettingsFactory',
  fn: SettingsFactory
};
