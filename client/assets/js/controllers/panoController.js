angular.module('controllers')
    .controller('panoController', ['$rootScope', '$scope', '$http', 'FoundationApi', 'UIStateService', 'PanoService', function($rootScope, $scope, $http, FoundationApi, UIStateService, PanoService) {

      $scope.panorama = {};
      $scope.UIState = UIStateService.get('location')
      $scope.panoConfigs = [];
      $scope.menuState = false;

      function getScenes(configs) {
        // iteratively build array of scene objects
        // each object has single top-level key denoting code
        // i.e. { "charles": {...(scene)...} }
        var scenes = [];
        angular.forEach(configs, function(val,key) {
          var scene = {};
          scenes[val.code] = val;
        });
        console.log(scenes);
        return pannellum.viewer('panorama', {   
          "default": {
              "firstScene": configs[0].code,
              "author": configs[0].group,
              "sceneFadeDuration": 1000,
              "autoLoad": true
          },
          
          "scenes": scenes
        });
      }

      FoundationApi.subscribe('sidebar', function(event) {
          if (event === 'close') {
              $scope.menuState = false;
          } else if (event === 'open') {
              $scope.menuState = true;
          } else { 
            $scope.menuState = !$scope.menuState;
          };
      });

      PanoService.getList().then(function(response){
        $scope.panoConfigs = response.data;
      }).finally(function(){
        $scope.panorama = getScenes($scope.panoConfigs);
      });
      
      $scope.welcome = function() {
        FoundationApi.publish('welcome-notifications', { title: 'Welcome to the UOIT Virtual Tour', content: 'Take a guided tour of the university from the comfort of your home with our digital tour guide, or just dive in!', color: 'dark', image: 'https://shared.uoit.ca/global/files/img/logos/UOIT_blue_shield.png' });
      }

    }
  ]);
