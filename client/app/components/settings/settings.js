import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import ngCookies from 'angular-cookies';
import ngStorage from 'angular-storage';

import settingsComponent from './settings.component';
import settingsFactory from './settings.factory';
import connectionDetailsService from './connectionDetails.service.js';

let settingsModule = angular.module('settings', [
  uiRouter,
  ngAnimate,
  ngMaterial,
  ngCookies,
	ngStorage
])

.component('userSettings', settingsComponent)

.factory('SettingsFactory', settingsFactory)

.service('ConnectionDetails', connectionDetailsService)

.config(($stateProvider) => {
  'ngInject'
	$stateProvider
    .state('settings', {
      parent: 'home',
      url: '/',
      component: 'userSettings'
    });
})

.name;

export default settingsModule;
