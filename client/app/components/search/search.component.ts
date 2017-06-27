import template from './search.html';

interface SearchParams {
  q: string;
  filter?: string[];
  fields?: string[];
};

export const SearchComponent: ng.IComponentOptions = {
  template,
  bindings: {
    query: '@',
    filters: '<'
  },
  controller: class SearchController implements ng.IController {
    searchResults;
    filters;

    constructor(
      private $log: ng.ILogService, 
      private $http: ng.IHttpService, 
      private $state: ng.ui.IStateService, 
      private SEARCH_FILTERS
    ) {
      'ngInject';

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

    querySearch (q): ng.IPromise<any> | any[] {
      if (!q) return [];

      const params: SearchParams = { q };

      if (this.filters.for.length) params.filter = this.filters.for;
      if (this.filters.by.length) params.fields = this.filters.by;

      return this.$http.get('/api/v1/search', { params })
        .then((result: any) => {
          this.searchResults = Object.keys(result.data.results).length ? result.data.results : false;
          console.info('[search.controller] $http.get', result.data);
          return result.data.overview;
        });
    }

    searchTextChange(text) {
      this.$log.info('[search.controller] searchTextChange', text);
    }

    selectedItemChange(item) {
      this.$log.info('[search.controller] selectedItemChange', item);
    }

    goToResult(type, item) {
      const params: vt.ITourState = {};
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
      console.info('[search.controller] goToResult', params);
      this.$state.go(type, params);
    }
  }
};
