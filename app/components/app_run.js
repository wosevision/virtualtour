function AppRun(
	$rootScope, $state,
	$popupWindow, UserAuth,
	GLOBAL_SETTINGS, USER_DEFAULTS, SettingsFactory) {
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

  function mergeSettings(settings, usage) {
	  if (settings) {
	  	Object.keys(settings).map(key => {
		  	if (USER_DEFAULTS.settings[key]) {
		  		USER_DEFAULTS.settings[key].val = settings[key];	
		  	}
		  });
		}
	  if (usage) {
	  	Object.keys(usage).map(key => {
		  	if (USER_DEFAULTS.usage[key]) {
		  		USER_DEFAULTS.usage[key].val = usage[key];	
		  	}
		  });
		}

	  $rootScope.appSettings = USER_DEFAULTS;
    SettingsFactory.set('settings', $rootScope.appSettings.settings);
    SettingsFactory.set('usage', $rootScope.appSettings.usage);
  }

  UserAuth.initAuth().then(user => {
	  if (user) {
		  mergeSettings(user.settings, user.usage);
	  } else {
		  mergeSettings(SettingsFactory.get('settings'), SettingsFactory.get('usage'));
	  }
  });
}

export default AppRun;
