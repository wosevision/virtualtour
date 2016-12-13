function AppRun(
	$rootScope, $state,
	$ErrorReporter,
	GLOBAL_SETTINGS, APP_SETTINGS, SettingsFactory) {
  'ngInject';

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => { 
    console.log('STATE CHANGE START', toState, toParams, fromState, fromParams, options);
  });

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
    $rootScope.pageTitle = '';
    $rootScope.pageTitle += GLOBAL_SETTINGS.APP._TITLE;
    if ( toState.label ) {
      $rootScope.pageTitle += ' | ';
      $rootScope.pageTitle += toState.label;
    }
    console.log('STATE CHANGE SUCCESS', toState, toParams, fromState, fromParams)
  });
  
  $rootScope.$on('handler:exception', function( event, error ) {
	  let locals = {
			type: error.cause,
			message: error.exception.message,
			suggest: [0, 2, 1]
  	}
		$ErrorReporter.error({locals});
  })

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    console.log('STATE CHANGE ERROR: ', error, toState, toParams, fromState, fromParams);
  });
  
  const _USER = SettingsFactory.get('USER');
  const _DATA = SettingsFactory.get('DATA');
  const USER = Object.assign(APP_SETTINGS.USER, _USER);
  const DATA = Object.assign(APP_SETTINGS.DATA, _DATA);

  $rootScope.appSettings = { USER, DATA };

  if (!_USER) {
    SettingsFactory.set('USER', $rootScope.appSettings.USER);
  }
  if (!_DATA) {
    SettingsFactory.set('DATA', $rootScope.appSettings.DATA);
  }

  // hook libs up to window
  // $rootScope.AFrame = window.AFRAME;
  // $rootScope.debugMode = {
  // 	scene: false
  // };
}

export default AppRun;
