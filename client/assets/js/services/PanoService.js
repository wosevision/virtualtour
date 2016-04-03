angular.module('services')
	.factory('PanoService', function($http){
		var baseURL = 'http://localhost:3000';
		return {
			getAll: function() {
				return $http.get(baseURL + '/panoramas')
				.then(function(response) {
				  return response;
				});
			},
			getLocation: function(location) {
				return $http.get(baseURL + '/panoramas/' + location)
				.then(function(response) {
				  return response;
				});
			},
			getScene: function(scene) {
				return $http.get(baseURL + '/panoramas/scene/' + id)
				.then(function(response) {
				  return response;
				});
			}
		}
	});