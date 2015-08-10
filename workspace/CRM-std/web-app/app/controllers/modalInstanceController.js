define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('modalInstanceController', ['$log', '$scope', '$modalInstance', '$filter', 'items', 'AlertService',
	                                          function($log, $scope, $modalInstance, $filter, items, AlertService) {
		
		$scope.header = 'CRM Selection';
		$scope.title = 'Selection Form';
		
		$scope.predicates = ['name', 'lastUpdated'];
	    $scope.selectedPredicate = $scope.predicates[0];	
	    
	    $scope.animationsEnabled = true;
	    
		$scope.items = items;
		
		/*$scope.selectedRow = null;  // initialize our variable to null
		$scope.selectedRowValue = null;
		$scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
		     $scope.selectedRow = index;
		     $scope.selectedRowValue = $scope.items[index];
		};
		
		$scope.selected = {
				item: $scope.items[0]
		};*/		 
		
		$scope.ok = function (index) {
			$modalInstance.close($scope.items[index]);	
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
		
		
	}]);
});


/*'use strict';
 

var dashboardControllers = angular.module('dashboardControllers', []);

dashboardControllers.controller('dashboardController', ['$scope',
  function($scope) {
    
  }]);
*/
