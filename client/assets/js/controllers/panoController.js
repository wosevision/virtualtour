angular.module('controllers', [])
    .controller('panoController', ['$scope', 'PanoService', function($scope, PanoService) {

      $scope.panoConfig = {};

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
