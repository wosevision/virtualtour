import * as angular from 'angular';

import AFrame from './aframe/aframe';
import ButtonBar from './buttonbar/buttonbar';
import { DrilldownModule } from './drilldown/drilldown';
import { MapModule } from './map/map';
import Search from './search/search';
import Settings from './settings/settings';
import TitleBar from './titlebar/titlebar';

const componentModule = angular.module('app.components', [
  AFrame,
  ButtonBar,
  DrilldownModule,
  MapModule,
  Search,
	Settings,
  TitleBar,
])

.name;

export default componentModule;
