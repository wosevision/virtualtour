function AppConfig($stateProvider, $locationProvider, $urlRouterProvider, $mdThemingProvider, $breadcrumbProvider ) { //, $mdIconProvider
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
      // url: '/',
      // url: '',
      abstract: true,
      // params: { view: null },
      template: '<ui-view flex layout="column" layout-fill></ui-view>',
      // controller($state, $stateParams) {
      //   if ($stateParams.view) {
      //   	$state.go($stateParams.view);
      //   }
      // },
		  ncyBreadcrumb: {
		  	skip: true,
		    label: ''
		  }
    });

  $stateProvider
    .state('settings', {
      //url: '/',
      parent: 'home',
      views: {
          '@' : {
            templateUrl: 'sidebar/settings/_settings.html',
            controller: 'SettingsCtrl'
          }
      },
		  ncyBreadcrumb: {
		    label: 'App settings'
		  }
    });
    
  // $stateProvider
  //   .state('playground', {
  //     //url: '/',
  //     parent: 'home',
  //     views: {
  //         '@' : {
  //           template: '<chat-window></chat-window>'
  //         }
  //     },
		//   ncyBreadcrumb: {
		//     label: '3D playground'
		//   }
  //   });
  $urlRouterProvider.otherwise('/');

  $breadcrumbProvider.setOptions({
    prefixStateName: 'home',
    template:
    	`<div class="breadcrumbs">
    		<md-button ng-href="{{step.ncyBreadcrumbLink}}" ng-repeat="step in steps">
    		 	<ng-md-icon icon="chevron_right" style="fill: #003c71;" size="20"></ng-md-icon>
    			{{ step.ncyBreadcrumbLabel }}
    		</md-button>
    	</div>`
  });

}

export default AppConfig;
