import angular from 'angular';

import AFrame from './aframe/aframe';
import ButtonBar from './buttonbar/buttonbar';
import Drilldown from './drilldown/drilldown';
import CampusMap from './map/map';
import Search from './search/search';
import Settings from './settings/settings';
import TitleBar from './titlebar/titlebar';

const componentModule = angular.module('app.components', [
  AFrame,
  ButtonBar,
  Drilldown,
  CampusMap,
  Search,
	Settings,
  TitleBar,
])

.name;

export default componentModule;
