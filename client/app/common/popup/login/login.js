import angular from 'angular';
import ngMaterial from 'angular-material';

import template from './login.html';
import controller from './login.controller';

import './login.scss';

let loginModule = angular.module('popup.login', [
  ngMaterial
])

.config(($mdDialogProvider) => {
  'ngInject';

	$mdDialogProvider.addPreset('login', {
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
	});
})

.name;

export default loginModule;
