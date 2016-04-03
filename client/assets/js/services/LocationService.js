angular.module('services', [])
	.factory('LocationService', function($http){

		var baseURL = 'http://localhost:3000';
		return {
			getAll: function() {
				return $http.get(baseURL + '/locations')
				.then(function(response) {
				  return response;
				});
			},
            getScenes: function(location) {
                return $http.get(baseURL + '/locations/'+location)
                .then(function(response) {
                  return response;
                });
            }
		}
    // return {
    // 	"all": function () {
    // 		return poi;
    // 	},
    // 	"locations": function () {
    // 		var out = [];
    // 		angular.forEach(poi, function(value) {
    // 			angular.forEach(value.locations, function (v) {
    // 				out.push(v);
    // 			});
    // 		});
    // 		return out;
    // 	},
    // 	"get": function (code) {
    // 		var out = {};
    // 		angular.forEach(poi, function(value) {
    // 			angular.forEach(value.locations, function (v) {
    // 				if (v.code == code) {
    // 					out = v;
    // 				}
    // 			});
    // 		});
    // 		return out;
    // 	}
    // };
	});