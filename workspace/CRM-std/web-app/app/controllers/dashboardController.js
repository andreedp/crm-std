define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('dashboardController', ['$log', '$scope', '$filter', '$location', '$routeParams', '$window', 'Contact', 'contacts', 'leads', 'opportunity', 'task', 'ContactService', 'AlertService',
	                                          function($log, $scope,  $filter, $location, $routeParams, $window, Contact, contacts, leads, opportunity, task, ContactService , AlertService) {
		
		$scope.header = 'CRM Dashboard';
		$scope.title = 'Dashboard';
		$scope.contacts = contacts;
		$scope.leads = leads;
		$scope.task = task;
		$scope.opportunity = opportunity;
		$scope.leadsCount = $scope.leads.length;
		$scope.contactsCount = $scope.contacts.length;
		$scope.opportunityCount = $scope.opportunity.length;
		$scope.taskCount = $scope.task.length;
		
		
	}]);
});


/*'use strict';
 

var dashboardControllers = angular.module('dashboardControllers', []);

dashboardControllers.controller('dashboardController', ['$scope',
  function($scope) {
    
  }]);
*/
