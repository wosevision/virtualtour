function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $mdThemingProvider ) { //, $mdIconProvider
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
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('UOITprimary', {
      'default': '400',
      'hue-1': '300',
      'hue-2': '500',
      'hue-3': '900'
    })
    .accentPalette('grey');

  // $mdIconProvider
  //               //.iconSet('action', '../images/icons/material-design/action-icons.svg', 24)
  //               .iconSet('alert', '../images/icons/material-design/alert-icons.svg', 24)
  //               //.iconSet('av', '../images/icons/material-design/av-icons.svg', 24)
  //               .iconSet('communication', '../images/icons/material-design/communication-icons.svg', 24)
  //               .iconSet('content', '../images/icons/material-design/content-icons.svg', 24)
  //               .iconSet('device', '../images/icons/material-design/device-icons.svg', 24)
  //               .iconSet('editor', '../images/icons/material-design/editor-icons.svg', 24)
  //               .iconSet('file', '../images/icons/material-design/file-icons.svg', 24)
  //               .iconSet('hardware', '../images/icons/material-design/hardware-icons.svg', 24)
  //               .iconSet('icons', '../images/icons/material-design/icons-icons.svg', 24)
  //               .iconSet('image', '../images/icons/material-design/image-icons.svg', 24)
  //               .iconSet('maps', '../images/icons/material-design/maps-icons.svg', 24)
  //               .iconSet('navigation', '../images/icons/material-design/navigation-icons.svg', 24)
  //               //.iconSet('notification', '../images/icons/material-design/notification-icons.svg', 24)
  //               .iconSet('social', '../images/icons/material-design/social-icons.svg', 24);
  //               //.iconSet('toggle', '../images/icons/material-design/toggle-icons.svg', 24);

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'SceneCtrl as scene',
    templateUrl: 'home.html',
    title: 'Home'
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
