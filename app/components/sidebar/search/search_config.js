function SearchConfig($stateProvider) {
  'ngInject'

	$stateProvider
    .state('search', {
      parent: 'home',
      url: '/',
      component: 'searchMenu'
    });
}

export default {
  name: 'SearchConfig',
  fn: SearchConfig
};