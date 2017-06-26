export const AppRun = ($rootScope, $state, $transitions, $compile, $mdUtil, $popupWindow, UserAuth, AUTH_EVENTS) => {
  'ngInject';

  /**
   * Report on exceptions. The `handler:exception` event is fired
   * anywhere an exception is caught, and if uncaught, the AppConfig
   * block also sends this event with special delegation.
   */
  $rootScope.$on('handler:exception', (event, error) => {
    const locals = {
      type: error.cause,
      message: error.exception.message,
      suggest: [0, 2, 1]
    }
    return $popupWindow.warning({locals});
  });

  $transitions.onStart({}, function(trans) {
    const auth = trans.injector().get('UserAuth');
    let toState = trans.$to(),
    		fromState = trans.$from();
    console.log('[$transitions] onStart', trans, toState, fromState);

    if (toState.data && toState.data.roles && !auth.isAuthorized(toState.data.roles)) {
	    if (auth.isAuthenticated()) {
	      $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
	    } else {
	      $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	    }
	  }
  });

  $state.defaultErrorHandler(error => {
    console.log('[$state] defaultErrorHandler', error);

    if (error.type !== 2) {
	    const locals = {
	      type: 'Navigation issue!',
	      message: error.message || error.msg || 'The view you requested hit a snag while loading.',
	      suggest: [4, 3]
	    }
	    $popupWindow.error({locals});
	  }
  });

  $state.onInvalid(error => {
    console.log('[$state] onInvalid', error);
    const locals = {
      type: 'Page not found!',
      message: `The page you were looking for could not be located.`,
      suggest: [3]
    }
    $popupWindow.error({locals});
  });

  $transitions.onError({}, function(trans) {
    const Popup = trans.injector().get('$popupWindow');
    const error = trans.error();
    console.log('[$transitions] onError', error);
    if (error.type !== 5 && error.type !== 2) {
      const locals = { message: `Navigation error!` }
      Popup.warning({locals});
    }
  });

  console.log('starting auth init...')
  UserAuth.initAuth().then(user => {
    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user);
    console.log('auth init complete!')
  });
}