export const SettingsFactory: ng.IServiceProviderFactory = store => {
  'ngInject';
  return store.getNamespacedStore('appSettings');
}
