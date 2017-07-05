import angular from 'angular';
import ngMaterial from 'angular-material';

import { TitleBarComponent } from './titlebar.component';
import { TitleBarButtonComponent } from './titlebar-button.component';

import './titlebar.scss';

export const TitleBarModule = angular.module('titlebar', [
  ngMaterial
])

.component('titleBar', TitleBarComponent)
.component('titleBarButton', TitleBarButtonComponent)

.name;
