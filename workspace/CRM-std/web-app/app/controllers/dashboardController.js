define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('dashboardController', ['$scope', 'Contact',
	                                          function($scope, Contact) {
		
		$scope.header = 'CRM Dashboard';
		$scope.title = 'Dashboard';
	}]);
});


/*'use strict';
 

var dashboardControllers = angular.module('dashboardControllers', []);

dashboardControllers.controller('dashboardController', ['$scope',
  function($scope) {
    
  }]);
*/
