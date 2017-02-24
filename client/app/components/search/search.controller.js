import { lowercase } from 'angular';

class SearchController {
	constructor($timeout, $log, $http, SEARCH_FILTERS) {
		'ngInject';
		this.$timeout = $timeout;
		this.$log = $log;
		this.$http = $http;

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
		console.log(params);
		return this.$http.get('/api/v1/search', { params }).then(result => {
			const output = [];
			Object.keys(result.data.results).forEach(type => output.push(...result.data.results[type]));
			this.searchResults = output;
			// return output;
			return result.data.overview;
		});
	}

	searchTextChange(text) {
		this.$log.info('Text changed to ' + text);
	}

	selectedItemChange(item) {
		this.$log.info('Item changed to ' + JSON.stringify(item));
	}
}

export default SearchController;
