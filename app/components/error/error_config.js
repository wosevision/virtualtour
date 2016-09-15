function ErrorConfig($provide ,$mdDialogProvider) { //, $mdIconProvider
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

	$provide.decorator('$exceptionHandler', ['$log', '$delegate', '$injector',
    function($log, $delegate, $injector) {
    	// let $ErrorReporter = $injector.get('$mdDialog');
      return function(exception, cause) {
        $log.debug('Default exception handler.', exception, cause);
    //     let locals = {
	  	// 		type: 'Error',
	  	// 		message: 'Request has timed out!',
	  	// 		suggest: [0, 2, 1]
		  // 	}
		  // 	$mdDialog.show(
				// 	$mdDialog.error({ locals })
				// );
        // $delegate(exception, cause);
      };
    }
  ]);

}

export default {
  name: 'ErrorConfig',
  fn: ErrorConfig
};
