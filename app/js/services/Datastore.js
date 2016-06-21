function Datastore(store) {
  'ngInject';
  return {
  	appSettings: store.getNamespacedStore('appSettings')
  }
}

export default {
  name: 'Datastore',
  fn: Datastore
};
