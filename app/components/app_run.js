/**
  * @function
  * @description Application run block; initializes $state event listeners, error handling and user auth
  */
function AppRun(
	$rootScope, $state,
	$popupWindow, UserAuth,
	AUTH_EVENTS) {
  'ngInject';
  
  $rootScope.$on('handler:exception', function( event, error ) {
	  const locals = {
			type: error.cause,
			message: error.exception.message,
			suggest: [0, 2, 1]
  	}
		$popupWindow.warning({locals});
  });

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => { 
    // console.log('STATE CHANGE START', toState, toParams, fromState, fromParams, options);
    if (toState.data && toState.data.roles && !UserAuth.isAuthorized(toState.data.roles)) {
      event.preventDefault();
      if (UserAuth.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  });

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
    $rootScope.pageTitle = 'UOIT Virtual Tour';
    if ( toState.label ) {
      $rootScope.pageTitle += ' | ';
      $rootScope.pageTitle += toState.label;
    }
    // console.log('STATE CHANGE SUCCESS', toState, toParams, fromState, fromParams);
  });

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    console.log('STATE CHANGE ERROR: ', error, toState, toParams, fromState, fromParams);
    const locals = {
    	type: 'Navigation issue!',
    	message: error.message || error.msg,
    	suggest: [4, 3]
    }
		$popupWindow.error({locals});
  });

  $rootScope.$on('$stateNotFound', (event, unfoundState, fromState, fromParams) => { 
    const locals = {
    	type: 'Page not found!',
    	message: `The page associated with (${unfoundState.to} : ${unfoundState.toParams}) cannot be located.`,
    	suggest: [3]
    }
		$popupWindow.error({locals});
    console.log('STATE NOT FOUND', unfoundState, fromState, fromParams);
	});

  console.log('starting auth init...')
  UserAuth.initAuth().then(user => {
    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user);
	  console.log('auth init complete!')
  });
}

export default AppRun;
