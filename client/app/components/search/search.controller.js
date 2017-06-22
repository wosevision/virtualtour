import { lowercase } from 'angular';

class SearchController {
	constructor($log, $http, $state, SEARCH_FILTERS) {
		'ngInject';
		this.$log = $log;
		this.$http = $http;
		this.$state = $state;

		const { typeFilters, modelFilters, fieldFilters } = SEARCH_FILTERS;
		Object.assign(this, { typeFilters, modelFilters, fieldFilters });
	}

	$onInit() {
		this.searchResults = [];
		this.filters = {
			in: [],
			for: [],
			by: []
		};
	}
	querySearch (q) {
		if (!q) return [];
		const params = { q };
		if (this.filters.for.length) params.filter = this.filters.for;
		if (this.filters.by.length) params.fields = this.filters.by;

		return this.$http.get('/api/v1/search', { params }).then(result => {
			this.searchResults = Object.keys(result.data.results).length ? result.data.results : false;
			console.log(result.data);
			return result.data.overview;
		});
	}

	searchTextChange(text) {
		this.$log.info('Text changed to ' + text);
	}

	selectedItemChange(item) {
		this.$log.info('Item changed to ' + JSON.stringify(item));
	}

	goToResult(type, item) {
		const params = {};
		switch(type) {
			case 'location':
				params.location = item.code;
				break;
			case 'building':
				params.location = item.parent.code;
				params.building = item.code;
				break;
			case 'scene':
				params.location = item.parent.parent.code;
				params.building = item.parent.code;
				params.scene = item.code;
				break;
		}
		console.log(params);
		this.$state.go(type, params);
	}
}

export default SearchController;
