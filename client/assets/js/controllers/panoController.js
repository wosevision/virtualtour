angular.module('controllers', [])
    .controller('panoController', ['$rootScope', '$scope', 'FoundationApi', 'PanoService', function($rootScope, $scope, FoundationApi, PanoService) {

      $scope.panoConfig = {};
      $scope.menuState = false;
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

      PanoService.getConfig('communications').then(function(response){
        $scope.panoConfig = response.data[0];
      }).finally(function(){
        //console.log($scope.panoConfig[0]);
        $scope.panorama = pannellum.viewer('panorama', {   
          "default": {
              "firstScene": "communications",
              "author": "Kalv & Jax",
              "autoLoad": true
          },
          
          "scenes": $scope.panoConfig
        });
      });
      

    }]);
