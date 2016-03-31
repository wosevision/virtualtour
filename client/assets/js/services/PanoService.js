angular.module('services')
	.factory('PanoService', function($http){
		var baseURL = 'http://localhost:3000';
		return {
			getList: function() {
				return $http.get(baseURL + '/panoramas')
				.then(function(response) {
				  return response;
				});
			},
			getConfig: function(id) {
				return $http.get(baseURL + '/panoramas/' + id)
				.then(function(response) {
				  return response;
				});
			}
		}
	});