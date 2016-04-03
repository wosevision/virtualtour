angular.module('controllers')
  .controller('mapController', ['$scope', '$state', 'UIStateService', 'uiGmapGoogleMapApi', function($scope, $state, UIStateService, uiGmapGoogleMapApi) {
  	$scope.map = {};
  	var events = {
      places_changed: function (searchBox) {}
    }
    $scope.searchbox = { template:'searchbox.tpl.html', events:events};
  	$scope.mapStyles = [
		{ //hide all strokes
			elementType: 'geometry.stroke',
			stylers: [
				{ visibility: 'off' }
			]
		},
		{ //hide all fills
			featureType: 'landscape.natural',
			elementType: 'geometry.fill',
			stylers: [
				{ visibility: 'off' }
			]
		},
		{ //hide all fills
			featureType: 'landscape.man_made',
			elementType: 'geometry.fill',
			stylers: [
				{ color: '#0077CA' }
			]
		},
		{ //hide all fills
			featureType: 'poi',
			elementType: 'geometry.fill',
			stylers: [
				{ color: '#003c71' }
			]
		},
		{
			elementType: 'labels.text',
			stylers: [
				{ visibility: 'simplified' },
				{ color: '#ffffff' }
			]
		}
		
	];
    uiGmapGoogleMapApi.then(function(maps) {
    	console.log(maps)
    	$scope.map = {
        center: {
          latitude: 43.9453764,
          longitude: -78.896397
        },
        pan: true,
        zoom: 16,
        refresh: false,
        options: {
          disableDefaultUI: true,
          styles: $scope.mapStyles
        },
        events: {},
        bounds: {},
        polys: [],
        draw: undefined
      };
    });

  }]);
