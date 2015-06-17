define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('CurrentUserController', ['$scope', 'User',
	                                          function($scope, User) {
		
		User.current().$promise.then(function(data){
    		$scope.currentUser = data.username;
    		
		});
	}]);
});


/*'use strict';
 

var dashboardControllers = angular.module('dashboardControllers', []);

dashboardControllers.controller('dashboardController', ['$scope',
  function($scope) {
    
  }]);
*/
