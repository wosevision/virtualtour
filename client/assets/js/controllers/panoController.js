angular.module('controllers', [])
    .controller('panoController', ['$rootScope', '$scope', '$http', 'FoundationApi', 'PanoService', function($rootScope, $scope, $http, FoundationApi, PanoService) {

      var actionSheet = document.getElementById('addHotspot');

      $scope.panoConfigs = [];
      $scope.menuState = false;
      $scope.addHotspot = {
        active: false,
        data: {
          parent: '',
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
          scenes[val.code] = val;
        });
        console.log(scenes);
        $scope.addHotspot.data.parent = configs[0]._id;
        return pannellum.viewer('panorama', {   
          "default": {
              "firstScene": configs[0].code,
              "autoLoad": true
          },
          
          "scenes": scenes
        });
      }

      $scope.submitHotspot = function(response) {
        var data = JSON.stringify($scope.addHotspot.data);
        $http.post('http://localhost:3000/hotspots', data).then(function(response) {
          console.log(response);
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

      PanoService.getList().then(function(response){
        $scope.panoConfigs = response.data;
      }).finally(function(){
        $scope.panorama = getScenes($scope.panoConfigs);
      });

      var touchContainer = document.getElementById('panorama');
      var hammertime = new Hammer(touchContainer);
      hammertime.on('press', function(ev) {
        // if ($scope.addHotspot.active === false) {
          actionSheet.style.top = ev.center.y+"px";
          actionSheet.style.left = ev.center.x+"px";
          $scope.addHotspot.active = true;
        // }
        coords = $scope.panorama.mouseEventToCoords(ev.srcEvent);
        $scope.addHotspot.data.pitch = coords[0];
        $scope.addHotspot.data.yaw = coords[1];
        $scope.$digest();
          console.log($scope.addHotspot);
      });
      

    }]);
