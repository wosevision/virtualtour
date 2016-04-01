angular.module('controllers', [])
  .controller('addHotspotController', ['$scope', '$http','FoundationApi', 'UIStateService', function($scope, $http, FoundationApi, UIStateService) {

      var actionSheet = document.getElementById('addHotspot');

      $scope.UIState = UIStateService.get('location')
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

      $scope.submitHotspot = function(response) {
        $scope.addHotspot.data.parent = $scope.panoConfigs[0]._id;
        var data = JSON.stringify($scope.addHotspot.data);
        $http.post('http://localhost:3000/hotspots', data).then(function(response) {
          $scope.addHotspot.active = false;
          FoundationApi.publish('main-notifications', { title: 'Hotspot added!', content: 'Refresh to view your changes.', color: 'success', autoclose: '3000' });
        });
      }

      var touchContainer = document.getElementById('panorama');
      var hammertime = new Hammer(touchContainer);
      hammertime.on('press', function(ev) {
        if (!actionSheet) {
          actionSheet = document.getElementById('addHotspot');
        }
        actionSheet.style.top = ev.center.y+"px";
        actionSheet.style.left = ev.center.x+"px";
        $scope.addHotspot.active = true;
        
        coords = $scope.panorama.mouseEventToCoords(ev.srcEvent);
        $scope.addHotspot.data.pitch = coords[0];
        $scope.addHotspot.data.yaw = coords[1];
        $scope.$digest();
          console.log($scope.addHotspot,ev);
      });
      

    }
  ]);
