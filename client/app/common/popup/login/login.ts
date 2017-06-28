import angular from 'angular';
import ngMaterial from 'angular-material';

import template from './login.html';
import { LoginController as controller } from './login.controller';

import './login.scss';

export const LoginModule = angular.module('popup.login', [
  ngMaterial
])

.config(($mdDialogProvider) => {
  'ngInject';

  const parent = angular.element(document.body);

	$mdDialogProvider.addPreset('login', {
	  options() {
	    return {
        parent,
	    	template,
	    	controller,
	      controllerAs: '$ctrl',
	      bindToController: true,
	      clickOutsideToClose: true,
	      escapeToClose: true
	    };
	  }
	});
})

.name;
