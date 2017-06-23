import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import { SearchComponent } from './search.component';

import './search.scss';

let searchModule = angular.module('search', [
  uiRouter,
  ngMaterial
])

.component('searchMenu', SearchComponent)

.constant('SEARCH_FILTERS', {
	typeFilters: [{
		label:'Virtual Tour',
		value:'tour'
	},{
		label:'Campus Map',
		value:'map'
	}],
	modelFilters: {
		tour: [{
			label:'Buildings',
			value:'buildings'
		},{
			label:'Tour scenes',
			value:'scenes'
		}],
		map: [{
			label:'Map features',
			value:'features'
		},{
			label:'Feature collections',
			value:'collections'
		}]
	},
	fieldFilters: [{
		label:'Name',
		value:'name,label'
	},{
		label:'Description',
		value:'desc'
	},{
		label:'Acronym',
		value:'code'
	}]
})

.name;

export default searchModule;
