import * as angular from 'angular';
import ngMaterial from 'angular-material';
import angulartics from 'angulartics';
import angularticsGa from 'angulartics-google-analytics';
import uiRouter from 'angular-ui-router';

import { DrilldownService } from './drilldown.service';
import { DrilldownComponent } from './drilldown.component';

import './drilldown.scss';

export const DrilldownModule = angular.module('drilldown', [
  ngMaterial,
  angulartics,
	angularticsGa,
  uiRouter,
])

.component('drilldownMenu', DrilldownComponent)
.service('DrilldownService', DrilldownService)

.name;
