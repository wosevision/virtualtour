import * as angular from 'angular';
import ngMaterial from 'angular-material';

import { TitleBarComponent } from './titlebar.component';
import { TitleBarButtonComponent } from './titlebar-button.component';
import { TITLEBAR_OPTS } from './titlebar-options.constant';

import './titlebar.scss';

export const TitleBarModule = angular.module('titlebar', [
  ngMaterial
])

.component('titleBar', TitleBarComponent)
.component('titleBarButton', TitleBarButtonComponent)

.constant('TITLEBAR_OPTS', TITLEBAR_OPTS)

.name;
