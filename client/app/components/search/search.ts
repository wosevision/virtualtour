import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import { SearchComponent } from './search.component';
import { SEARCH_FILTERS } from './search-filters.constant';

import './search.scss';

export const SearchModule = angular.module('search', [
  uiRouter,
  ngMaterial
])

.component('searchMenu', SearchComponent)

.constant('SEARCH_FILTERS', SEARCH_FILTERS)

.name;
