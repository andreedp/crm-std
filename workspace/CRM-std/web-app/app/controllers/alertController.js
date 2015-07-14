define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('alertController', ['$scope', 'AlertService',
	                                          function($scope, AlertService) {
		
			$scope.alerts = AlertService.get();
			
	}]);
});


/*'use strict';
 

var dashboardControllers = angular.module('dashboardControllers', []);

dashboardControllers.controller('dashboardController', ['$scope',
  function($scope) {
    
  }]);
*/
