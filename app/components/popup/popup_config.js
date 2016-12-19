import { element } from 'angular';

function PopupConfig($mdDialogProvider) {
  'ngInject';
  
  const parent = element(document.body);

	$mdDialogProvider.addPreset('error', {
	  options() {
	    return {
	    	parent,
	      templateUrl: 'popup/error/_error.html',
	      controller: 'ErrorCtrl',
	      controllerAs: 'error',
	      bindToController: true,
	      clickOutsideToClose: true,
	      escapeToClose: true
	    };
	  }
	});
	
	$mdDialogProvider.addPreset('welcome', {
	  options() {
	    return {
	      parent,
	      controller: 'DialogCtrl',
	      templateUrl: 'popup/welcome/_welcome-dialog.html',
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

	$mdDialogProvider.addPreset('login', {
	  options() {
	    return {
	    	parent,
	      templateUrl: 'popup/login/_login.html',
	      controller: 'LoginCtrl',
	      controllerAs: '$ctrl',
	      bindToController: true,
	      clickOutsideToClose: true,
	      escapeToClose: true
	    };
	  }
	});

}

export default {
  name: 'PopupConfig',
  fn: PopupConfig
};
