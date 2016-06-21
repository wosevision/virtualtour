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

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '',
      //url: '',
      abstract: true,
      views: {
        '@' : {
          templateUrl: 'home.html'
        }
      }
    });
  $stateProvider
    .state('location', {
      url: '/',
      //url: 'location',
      parent: 'home',
      views: {
        'sidebarView' : {
          templateUrl: '_sidebar/_location.html',
          controller: 'LocationCtrl as Location'
        },
        'sceneView' : { 
          templateUrl: 'welcome.html',
          controller: function($mdDialog) {
            function DialogController($scope, $mdDialog) {
              $scope.hide = function() {
                $mdDialog.hide();
              };
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.answer = function(answer) {
                $mdDialog.hide(answer);
              };
            }
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'partials/_welcomedialog.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true
            })
                .then(function(answer) {
                  $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                  $scope.status = 'You cancelled the dialog.';
                });
          } 
        }
      }
    })
      .state('location.detail', {
        url: ':code',
        // params: { code: null },
        views: {
          'sidebarView@home' : {
            templateUrl: '_sidebar/_location-detail.html',
            resolve: {
              locationResource: function (Location, $stateParams) {
                return Location.get({ code: $stateParams.code }).$promise;
              }
            },
            controller: function($scope, locationResource) {
              $scope.location = locationResource.location;
            }
          }
        }
      })
        .state('scene', {
          url: '/:code/:id',
          parent: 'home',
          //url: '/:id',
          //parent: 'location.detail',
          views: {
            'sceneView@home' : {
              template: '<build-scene scene="scene"></build-scene>',
              resolve: {
                sceneResource: function (Scene, $stateParams) {
                  return Scene.get({ id: $stateParams.id }).$promise;
                }
              },
              controller: function($scope, $stateParams, sceneResource) {
                $scope.scene = sceneResource.scene;
              }
            },
            'sidebarView@home' : {
              templateUrl: '_sidebar/_location-detail.html',
              resolve: {
                locationResource: function (Location, $stateParams) {
                  return Location.get({ code: $stateParams.code }).$promise;
                }
              },
              controller: function($scope, locationResource) {
                $scope.location = locationResource.location;
              }
            }
          }
        });
  $stateProvider
    .state('settings', {
      //url: '/',
      parent: 'home',
      views: {
          'sidebarView' : {
            templateUrl: '_sidebar/_settings.html',
            controller: 'SettingsCtrl'
          }
      }
    });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
