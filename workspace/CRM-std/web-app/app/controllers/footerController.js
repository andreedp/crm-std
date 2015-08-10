define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('footerController', ['$log','$scope', '$route', '$routeParams', '$location', 'FooterService',
	                                          function($log, $scope, $route, $routeParams, $location, FooterService) {
		
		 /*$scope.$route = $route;
	     $scope.location = $location.path();
	     $log.info('[FooterService::parseURL]URL: ' + $scope.location);
	     FooterService.parseURL($scope.location);
	     $scope.$routeParams = $routeParams;		
		*/
	}]);
});


/*'use strict';
 

var dashboardControllers = angular.module('dashboardControllers', []);

dashboardControllers.controller('dashboardController', ['$scope',
  function($scope) {
    
  }]);
*/
