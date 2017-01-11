const searchMenu = {
		bindings: {
			query: '@',
			filters: '<'
		},
		templateUrl: 'sidebar/search/_search.html',
		controller: 'SearchCtrl'
	};

export default {
  name: 'searchMenu',
  fn: searchMenu
};