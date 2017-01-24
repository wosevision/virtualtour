import { element } from 'angular';

/**
 * The application run block initializes $state event listeners, error handling
 * and runtime user-authentication. It is mostly responsible for serving as
 * a "hub" for the application's communication, e.g. through `$event`s.
 *  
 * @param {object} $rootScope   The app's top-level scope
 * @param {object} $state       ui-router's state service
 * @param {object} $popupWindow The popup window toast/dialog service
 * @param {object} UserAuth     User authenticator service
 * @param {object} AUTH_EVENTS  Constant of $event name strings
 */
function AppRun(
  $rootScope, $state, $compile, $mdUtil,
  $popupWindow, UserAuth,
  AUTH_EVENTS) {
  'ngInject';

  $rootScope.$on('cfpLoadingBar:started', event => $mdUtil.nextTick( tick => $compile(
    element(document.getElementById('loading-spinner'))
  )($rootScope)));
  /**
   * Report on exceptions. The `handler:exception` event is fired
   * anywhere an exception is caught, and if uncaught, the AppConfig
   * block also sends this event with special delegation.
   * 
   * @function $rootScope.$on
   * @memberof AppRun
   * @param  {String}   event    The event name
   * @param  {function} callback To execute on handler call
   */
  $rootScope.$on('handler:exception', (event, error) => {
    const locals = {
      type: error.cause,
      message: error.exception.message,
      suggest: [0, 2, 1]
    }
    return $popupWindow.warning({locals});
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
