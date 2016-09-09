function AppRun($rootScope, $templateCache, $breadcrumb, GLOBAL_SETTINGS, APP_SETTINGS, SettingsFactory) {
  'ngInject';

  // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) { 
    // event.preventDefault(); 
    //console.log('STATE CHANGE START', toState, toParams, fromState, fromParams, options);

    // if ( toState.name == 'scene' ) {
    	// console.log($rootScope)
    // }
  // });

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
    $rootScope.pageTitle = '';
    if ( toState.ncyBreadcrumbLabel ) {
      $rootScope.pageTitle += toState.ncyBreadcrumbLabel;
      $rootScope.pageTitle += ' | ';
    }
    $rootScope.pageTitle += GLOBAL_SETTINGS.APP._TITLE;
    //console.log('STATE CHANGE SUCCESS', toState, toParams, fromState, fromParams);

  });

  // $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    //console.log('STATE CHANGE ERROR: ', error, toState, toParams, fromState, fromParams);
  // });

  // $rootScope.$on('$viewContentLoaded', (event) => {
    //console.log('try this sucka: ', $breadcrumb.getLastStep());
  // });
  
  let _USER = SettingsFactory.appSettings.get('_USER');
  let _DATA = ''//SettingsFactory.appSettings.get('_DATA');

  $rootScope.appSettings = {
    USER: _USER || APP_SETTINGS.USER,
    DATA: _DATA || APP_SETTINGS.DATA
  }

  if (!_USER) {
    SettingsFactory.appSettings.set('_USER', $rootScope.appSettings.USER);
  }
  if (!_DATA) {
    SettingsFactory.appSettings.set('_DATA', $rootScope.appSettings.DATA);
  }

  // hook libs up to window
  $rootScope.AFrame = window.AFRAME;
  //$rootScope.AFrame.registerComponent('fps-look-controls', require('aframe-fps-look-component').component);

}

export default AppRun;
