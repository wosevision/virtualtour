function AppRun(
	$rootScope, $state,
	$popupWindow, UserAuth) {
  'ngInject';
  
  $rootScope.$on('handler:exception', function( event, error ) {
	  let locals = {
			type: error.cause,
			message: error.exception.message,
			suggest: [0, 2, 1]
  	}
		$popupWindow.warning({locals});
  });

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => { 
    console.log('STATE CHANGE START', toState, toParams, fromState, fromParams, options);
  });

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
    $rootScope.pageTitle = 'UOIT Virtual Tour';
    if ( toState.label ) {
      $rootScope.pageTitle += ' | ';
      $rootScope.pageTitle += toState.label;
    }
    console.log('STATE CHANGE SUCCESS', toState, toParams, fromState, fromParams)
  });

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    console.log('STATE CHANGE ERROR: ', error, toState, toParams, fromState, fromParams);
  });

  console.log('starting auth init...')
  UserAuth.initAuth().then(user => {
	  console.log('auth init complete!')
  });
}

export default AppRun;
