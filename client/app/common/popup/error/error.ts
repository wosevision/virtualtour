import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';

import { ErrorController as controller} from './error.controller';
import template from './error.html';

import './error.scss';

export const ErrorModule = angular.module('popup.error', [
  uiRouter,
  ngSanitize,
  ngMaterial
])

.config(($mdDialogProvider) => {
  'ngInject';

	$mdDialogProvider.addPreset('error', {
	  options() {
	    return {
	    	template,
	    	controller,
	      controllerAs: '$ctrl',
	      bindToController: true,
	      clickOutsideToClose: true,
	      escapeToClose: true,
	    	parent: angular.element(document.body)
	    };
	  }
	})
})

.name;
