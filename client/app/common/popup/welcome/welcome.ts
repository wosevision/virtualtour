import angular from 'angular';
import ngMaterial from 'angular-material';
import nzTour from 'nz-tour';

import { WelcomeController as controller } from './welcome.controller';
import template from './welcome.html';

import './welcome.scss';

export const WelcomeModule = angular.module('popup.welcome', [
  ngMaterial,
  nzTour
])

.config(($mdDialogProvider) => {
  'ngInject';
	
	$mdDialogProvider.addPreset('welcome', {
	  options() {
	    return {
	    	template,
	    	controller,
	    	parent: angular.element(document.body),
	      controllerAs: '$ctrl',
	      bindToController: true,
	      // targetEvent: ev,
	      clickOutsideToClose: true,
	      openFrom: {
	      	top: 18,
	      	left: 18,
	      	width: 36,
	      	height: 60
	      },
	      closeTo: {
	      	top: 18,
	      	left: 18,
	      	width: 36,
	      	height: 60
	      }
	    }
	  }
	});
})

.name;
