angular.module('services')
	.factory('UIStateService', function(){
		var UIState = {};
		return {
			get: function() {
					return UIState;
			},
			set: function(prop, val) {
				return UIState[prop] = val;
			}
		}
	});