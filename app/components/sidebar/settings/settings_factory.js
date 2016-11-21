function SettingsFactory(store) {
  'ngInject';
  return store.getNamespacedStore('appSettings');
}

export default {
  name: 'SettingsFactory',
  fn: SettingsFactory
};
