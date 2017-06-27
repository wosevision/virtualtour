import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import ngCookies from 'angular-cookies';
import ngStorage from 'angular-storage';

import { SettingsComponent } from './settings.component';
import { SettingsFactory } from './settings.factory';
import { ConnectionDetailsService } from './connection/connection-details.service';
import { CONNECTION_PROFILES } from './connection/connection-profiles.constant';

import './settings.scss';

export const SettingsModule = angular.module('settings', [
  uiRouter,
  ngAnimate,
  ngMaterial,
  ngCookies,
  ngStorage
])

.component('userSettings', SettingsComponent)

.factory('SettingsFactory', SettingsFactory)

.service('ConnectionDetails', ConnectionDetailsService)

.constant('CONNECTION_PROFILES', CONNECTION_PROFILES)

.name;
