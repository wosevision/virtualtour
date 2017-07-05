import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import { ButtonbarComponent } from './buttonbar.component';

import './buttonbar.scss';

export const ButtonbarModule = angular.module('buttonbar', [
  uiRouter,
  ngMaterial
])

.component('buttonBar', ButtonbarComponent)

.name;