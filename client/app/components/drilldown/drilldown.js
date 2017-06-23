import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import angulartics from 'angulartics';
import angularticsGa from 'angulartics-google-analytics';

import { DrilldownService } from './drilldown.service';
import { DrilldownComponent } from './drilldown.component';

import './drilldown.scss';

let drilldownModule = angular.module('drilldown', [
  uiRouter,
  ngMaterial,
  angulartics,
	angularticsGa
])

.component('drilldownMenu', DrilldownComponent)
.service('DrilldownService', DrilldownService)

.name;

export default drilldownModule;
