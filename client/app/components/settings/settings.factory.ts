export const SettingsFactory = store => {
  'ngInject';
  return store.getNamespacedStore('appSettings');
}
