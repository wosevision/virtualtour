import * as angular from 'angular';

import { AFrameModule } from './aframe/aframe';
import { ButtonbarModule } from './buttonbar/buttonbar';
import { DrilldownModule } from './drilldown/drilldown';
import { MapModule } from './map/map';
import { SearchModule } from './search/search';
import { SettingsModule } from './settings/settings';
import { TitleBarModule } from './titlebar/titlebar';

const componentModule = angular.module('app.components', [
  AFrameModule,
  ButtonbarModule,
  DrilldownModule,
  MapModule,
  SearchModule,
  SettingsModule,
  TitleBarModule,
])

.name;

export default componentModule;
