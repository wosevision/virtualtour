import { NgModule } from 'ng-metadata/core';
import ngMaterial from 'angular-material';
import angulartics from 'angulartics';
import angularticsGa from 'angulartics-google-analytics';
import uiRouter from 'angular-ui-router';

import { DrilldownService } from './drilldown.service';
import { DrilldownComponent } from './drilldown.component';

import './drilldown.scss';

@NgModule({
  imports: [
    ngMaterial,
    angulartics,
    angularticsGa,
    uiRouter,
  ],
  declarations: [DrilldownComponent],
  providers: [DrilldownService]
})
export class DrilldownModule {}