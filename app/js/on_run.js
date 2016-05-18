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

  $rootScope.not = function(func) {
    return function (item) { 
      return !func(item); 
    }
  };

  $rootScope.AFrame = window.AFRAME;
  $rootScope._ = window._;
  //$rootScope.AFrame.registerComponent('fps-look-controls', require('aframe-fps-look-component').component);

}

export default OnRun;
