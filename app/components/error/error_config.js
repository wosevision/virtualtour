function ErrorConfig($provide , $mdDialogProvider) { //, $mdIconProvider
  'ngInject';
	$mdDialogProvider.addPreset('error', {
	  options() {
	    return {
	    	parent: document.body,
	      templateUrl: 'error/_error.html',
	      controller: 'ErrorCtrl',
	      controllerAs: 'error',
	      bindToController: true,
	      clickOutsideToClose: true,
	      escapeToClose: true
	    };
	  }
	});

	$provide.decorator('$exceptionHandler', function($log, $delegate, $injector) {
		'ngInject';
    return function(exception, cause) {
	    // let $rootScope = $injector.get('$rootScope');
	    // $rootScope.$broadcast('handler:exception', {
	    //   exception: exception,
	    //   cause: cause || 'Application error'
	    // });

	    // FOR "SOFTER" ERRORS:
      $log.debug(exception, cause);
      
  		$delegate(exception, cause);
    };
  });

}

export default {
  name: 'ErrorConfig',
  fn: ErrorConfig
};
