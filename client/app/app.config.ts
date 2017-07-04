AppConfig.$inject = ['$provide', '$locationProvider', '$stateProvider', '$urlRouterProvider', '$mdGestureProvider', '$mdThemingProvider', 'cfpLoadingBarProvider']
export function AppConfig($provide, $locationProvider, $stateProvider, $urlRouterProvider, $mdGestureProvider, $mdThemingProvider, cfpLoadingBarProvider) { //, $mdIconProvider
  
  // cfpLoadingBarProvider.latencyThreshold = 300;
  // cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.parentSelector = '#title-bar';

  // THIS IS VERY IMPORTANT, ngMaterial's clickjacking behaviour
  // tampers with the capture phase in a way that is incompatible
  // with A-Frame's mobile click capturing. It must be disabled
  // for in-scene clicks to work on mobile.
  $mdGestureProvider.skipClickHijack();

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
    url: ''
  })
  .state('location', {
    parent: 'home',
    url: '/:location',
    resolve: {
      params: ['$transition$', ($transition$) => $transition$.params()],
      currentLocation: ['params', 'TourResourceService', (params, TourResourceService) => {
        return TourResourceService.location.query({ 
          filter: {
            code: params.location 
          }
        }).$promise;
      }],
      sceneData: ['params', 'SceneService', 'TourResourceService', 'currentLocation', (params, SceneService, TourResourceService, currentLocation) => {
        if (currentLocation[0] && currentLocation[0].default) {
          return TourResourceService.scene.get({ id: currentLocation[0].default })
            .$promise
            .then(scene => {
              if (!params.building) {
                SceneService.scene = scene
              }
            });
        }
      }]
    }
  })
  .state('building', {
    parent: 'location',
    url: '/:building',
    resolve: {
      params: ['$transition$', ($transition$) => $transition$.params()],
      currentBuilding: ['params', 'TourResourceService', (params, TourResourceService) => {
        return TourResourceService.building.query({ 
          filter: {
            code: params.building 
          }
        }).$promise;
      }],
      sceneData: ['params', 'SceneService', 'TourResourceService', 'currentBuilding', (params, SceneService, TourResourceService, currentBuilding) => {
        if (currentBuilding[0] && currentBuilding[0].default) {
          return TourResourceService.scene.get({ id: currentBuilding[0].default })
            .$promise
            .then(scene => {
              if (!params.scene) {
                SceneService.scene = scene
              }
            });
        }
      }]
    }
  })
  .state('scene', {
    parent: 'building',
    url: '/:scene',
    resolve: {
      params: ['$transition$', ($transition$) => $transition$.params()],
      currentScene: ['params', 'TourResourceService', 'currentBuilding', (params, TourResourceService, currentBuilding) => {
        return TourResourceService.scene.query({ 
          filter: {
            code: params.scene,
            parent: currentBuilding[0]._id
          }
        }).$promise;
      }],
      sceneData: ['params', 'SceneService', 'TourResourceService', 'currentScene', (params, SceneService, TourResourceService, currentScene) => {
        if (currentScene[0] && currentScene[0]._id) {
          return TourResourceService.scene.get({ id: currentScene[0]._id })
            .$promise
            .then(scene => SceneService.scene = scene);
        }
      }]
    }
  });

  $urlRouterProvider.otherwise('/');

  $provide.decorator('$exceptionHandler', ($log, $delegate, $injector) => {
    'ngInject';
    return (exception, cause) => {
      const $rootScope = $injector.get('$rootScope');
      if (!cause) cause = 'Application error';
      $rootScope.$broadcast('handler:exception', { exception, cause });

      // FOR "SOFTER" ERRORS:
      // $log.debug(exception, cause);
      
      $delegate(exception, cause);
    };
  });
}