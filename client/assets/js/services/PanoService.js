angular.module('services')
	.factory('PanoService', function($http){
		var baseURL = 'configs/';
		return {
			getConfig: function(id) {
				getURL = baseURL + id + '.json';
				return $http.get(getURL)
					.then(function(response) {
					  return response;
					});
			}
		}
	});