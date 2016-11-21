function DraftFactory(store) {
  'ngInject';
  return store.getNamespacedStore('savedDrafts');
}

export default {
  name: 'DraftFactory',
  fn: DraftFactory
};
