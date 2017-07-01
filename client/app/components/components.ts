import { NgModule } from 'ng-metadata/core';

import { AFrameModule } from './aframe/aframe';
import { ButtonbarModule } from './buttonbar/buttonbar';
import { DrilldownModule } from './drilldown/drilldown';
import { MapModule } from './map/map';
import { SearchModule } from './search/search';
import { SettingsModule } from './settings/settings';
import { TitleBarModule } from './titlebar/titlebar';

@NgModule({
  imports: [
    AFrameModule,
    ButtonbarModule,
    DrilldownModule,
    MapModule,
    SearchModule,
    SettingsModule,
    TitleBarModule,
  ]
})
export class ComponentsModule {}
