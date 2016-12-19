function AppConfig($provide, $stateProvider, $locationProvider, $urlRouterProvider, $mdThemingProvider ) { //, $mdIconProvider
  'ngInject';

  $mdThemingProvider.definePalette('UOITprimary', {
    '50': '0086FC',
    '100': '45A1FA',
    '200': '74B8FB',
    '300': 'A2D0FD',
    '400': '0077CA',
    '500': '006BB8',
    '600': '005FA6',
    '700': '005495',
    '800': '004883',
    '900': '003C71',
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', 'A100'],
    'contrastLightColors': null    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('UOITprimary', {
      'default': '400',
      'hue-1': '300',
      'hue-2': '500',
      'hue-3': '900'
    })
    .accentPalette('grey');

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      abstract: true,
      template: '<ui-view></ui-view>',
    });

  $stateProvider
    .state('settings', {
      parent: 'home',
      templateUrl: 'sidebar/settings/_settings.html',
      controller: 'SettingsCtrl',
      controllerAs: '$ctrl'
    });

  $urlRouterProvider.otherwise('/');

	$provide.decorator('$exceptionHandler', function($log, $delegate, $injector) {
		'ngInject';
    return function(exception, cause) {
	    let $rootScope = $injector.get('$rootScope');
	    $rootScope.$broadcast('handler:exception', {
	      exception: exception,
	      cause: cause || 'Application error'
	    });

	    // FOR "SOFTER" ERRORS:
      $log.debug(exception, cause);
      
  		// $delegate(exception, cause);
    };
  });

}

export default AppConfig;
