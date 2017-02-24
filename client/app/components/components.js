import angular from 'angular';

import AFrame from './aframe/aframe';
import Drilldown from './drilldown/drilldown';
import CampusMap from './map/map';
import Search from './search/search';
import Settings from './settings/settings';

const componentModule = angular.module('app.components', [
  AFrame,
  Drilldown,
  CampusMap,
  Search,
	Settings
])

.name;

export default componentModule;
