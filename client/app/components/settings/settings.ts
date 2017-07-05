import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import ngCookies from 'angular-cookies';
import ngStorage from 'angular-storage';

import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { ConnectionDetailsService } from './connection/connection-details.service';

import './settings.scss';

export const SettingsModule = angular.module('settings', [
  uiRouter,
  ngAnimate,
  ngMaterial,
  ngCookies,
  ngStorage
])

.component('userSettings', SettingsComponent)

.service('ConnectionDetails', ConnectionDetailsService)

.service('SettingsService', SettingsService)

.name;
