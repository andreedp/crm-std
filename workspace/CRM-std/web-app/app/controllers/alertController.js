define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('AlertController', ['$scope', 'AlertService',
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
