import * as angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import { ButtonbarComponent } from './buttonbar.component';
import { BUTTONBAR_VIEWS } from './buttonbar-views.constant';

import './buttonbar.scss';

export const ButtonbarModule = angular.module('buttonbar', [
  uiRouter,
  ngMaterial
])

.component('buttonBar', ButtonbarComponent)

.constant('BUTTONBAR_VIEWS', BUTTONBAR_VIEWS)

.name;