import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';

import template from './info.html';
import controller from './info.controller';

let infoModule = angular.module('popup.info', [
  uiRouter,
  ngSanitize,
	ngMaterial
])

.config(($mdDialogProvider) => {
  'ngInject';

	$mdDialogProvider.addPreset('info', {
	  options() {
	    return {
	    	template,
	    	controller,
	    	parent: angular.element(document.body),
	      controllerAs: '$ctrl',
	      bindToController: true,
	      clickOutsideToClose: true,
	      escapeToClose: true
	    };
	  }
	})
})

.name;

export default infoModule;
