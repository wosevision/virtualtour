function OnRun($rootScope, $templateCache, GlobalSettings) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';
    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' | ';
    }
    $rootScope.pageTitle += GlobalSettings.APP._TITLE;
  });

  // not() utility function for use in views
  $rootScope.not = function(func) {
    return function (item) { 
      return !func(item); 
    }
  };

  $rootScope.appSettings = {
    _USER: {
      __TOOLBAR_OPEN: {
        val: true,
        label: 'Toolbar open by default',
        icon: 'last_page'
      },
      __SHOW_TOOLTIPS: {
        val: true,
        label: 'Show hint messages',
        icon: 'announcement'
      }
    }
  }

  // hook libs up to window
  $rootScope.AFrame = window.AFRAME;
  $rootScope._ = window._;
  //$rootScope.AFrame.registerComponent('fps-look-controls', require('aframe-fps-look-component').component);

}

export default OnRun;
