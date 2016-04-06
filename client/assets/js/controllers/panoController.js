angular.module('controllers')
    .controller('panoController', ['$rootScope', '$scope', '$http', 'FoundationApi', 'UIStateService', 'PanoService', function($rootScope, $scope, $http, FoundationApi, UIStateService, PanoService) {

      $scope.panorama = {};
      $scope.location = {};
      $scope.scenes = {};
      $scope.currentScene = '';
      $scope.menuState = false;

      function makePano(location, firstScene) {
        $scope.scenes = makeScenes(location);
        $scope.currentScene = $scope.scenes[firstScene];
        return pannellum.viewer('panorama', {   
          "default": {
              "firstScene": firstScene || location.scenes[0].code,
              "author": location.name,
              "sceneFadeDuration": 1000,
              "autoLoad": true
          },
          "scenes": $scope.scenes
        });
      }

      function makeScenes(location) {
        // iteratively build array of scene objects
        // each object has single top-level key denoting code
        // i.e. { "charles": {...(scene)...} }
        var scenes = {};
        angular.forEach(location.scenes, function(val,key) {
          var scene = {};
          scenes[val.code] = val;
        });
        return scenes;
      }

      function loadScenes(location, firstScene) {
        PanoService.getLocation(location).then(function(response){
          $scope.location = response.data[0];
        }).finally(function(){
          $scope.panorama = makePano($scope.location, firstScene);
        });
      }
      function loadScene (scene, pitch, yaw) {
        $scope.panorama.loadScene(scene, pitch, yaw);
      }

      loadScenes('charles', 'charles_ext_1a');

      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if (toParams.scene) {
          $scope.currentScene = $scope.scenes[toParams.scene];
          console.log($scope.currentScene);
          loadScene(toParams.scene, 0, 0);
        }
      });

      FoundationApi.subscribe('sidebar', function(event) {
          if (event === 'close') {
              $scope.menuState = false;
          } else if (event === 'open') {
              $scope.menuState = true;
          } else { 
            $scope.menuState = !$scope.menuState;
          };
      });
      
      $scope.welcome = function() {
        FoundationApi.publish('welcome-notifications', { title: 'Welcome to the UOIT Virtual Tour', content: 'Take a guided tour of the university from the comfort of your home with our digital tour guide, or just dive in!', color: 'dark', image: 'https://shared.uoit.ca/global/files/img/logos/UOIT_blue_shield.png' });
      }

    }
  ]);
