angular.module('controllers', [])
    .controller('panoController', ['$rootScope', '$scope', 'FoundationApi', 'PanoService', function($rootScope, $scope, FoundationApi, PanoService) {

      $scope.sceneId = 'communications';
      $scope.panoConfigs = [];
      $scope.menuState = false;
      $scope.addHotspot = {
        active: false,
        data: {
          parent: $scope.sceneId,
          type: 'info',
          text: '',
          URL: '',
          sceneId: '',
          targetPitch: 0,
          targetYaw: 0,
          pitch: 0,
          yaw: 0
        }
      };

      function getScenes(configs) {
        // iteratively build array of scene objects
        // each object has single top-level key denoting code
        // i.e. { "charles": {...(scene)...} }
        var scenes = [];
        angular.forEach(configs, function(val,key) {
          var scene = {};
          scene[val.code] = val;
          scenes.push(scene);
        });
        return pannellum.viewer('panorama', {   
          "default": {
              "firstScene": configs[0].code,
              "author": "Kalv & Jax",
              "autoLoad": true
          },
          
          "scenes": scenes[0]
        });
      }

      FoundationApi.subscribe('sidebar', function(event) {
          if (event === 'close') {
              $scope.menuState = false;
          } else if (event === 'open') {
              $scope.menuState = true;
          } else { 
              // event === 'toggle'
              $scope.menuState = !$scope.menuState;
          };
      });

      PanoService.getConfig($scope.sceneId).then(function(response){
        $scope.panoConfigs = response.data;
      }).finally(function(){
        $scope.panorama = getScenes($scope.panoConfigs);
      });

      var touchContainer = document.getElementById('panorama');
      var hammertime = new Hammer(touchContainer);
      hammertime.on('press', function(ev) {
        $scope.addHotspot.active = !$scope.addHotspot.active;
        coords = $scope.panorama.mouseEventToCoords(ev.srcEvent);
          console.log(coords);
        $scope.addHotspot.data.pitch = coords[0];
        $scope.addHotspot.data.yaw = coords[1];
        $scope.$digest();
      });
      

    }]);
