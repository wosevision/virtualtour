import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';

import { InfoController as controller } from './info.controller';
import template from './info.html';

export const InfoModule = angular.module('popup.info', [
  uiRouter,
  ngSanitize,
	ngMaterial
])

.config(($mdDialogProvider) => {
  'ngInject';
  const parent = angular.element(document.body);

	$mdDialogProvider.addPreset('info', {
	  options() {
	    return {
	    	template,
	    	controller,
	    	parent,
	      controllerAs: '$ctrl',
	      bindToController: true,
	      clickOutsideToClose: true,
	      escapeToClose: true
	    };
	  }
	})
})

.name;
