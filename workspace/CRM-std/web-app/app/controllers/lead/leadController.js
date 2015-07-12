define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('leadController', ['$scope', 'Lead',
	                                          function($scope, Lead) {
			
			$scope.header = 'Leads Management';
			$scope.title = 'Leads';
			$scope.lead = Lead.query();
		    $scope.orderProp = 'name';
			
	}]);
	
	controllers.controller('leadListController', ['$scope', '$routeParams', '$window', 'Lead', 'LeadService', 'AlertService',
		                                          function($scope,  $routeParams, $window, Lead, LeadService, AlertService) {
				
				$scope.header = 'Leads Management';
				$scope.title = 'Leads';
				$scope.date = {startDate: null, endDate: null};
				$scope.today = function() {
				    $scope.dt = new Date();
				  };
				$scope.today();
				$scope.dateOptions = {
					    formatYear: 'yy',
					    startingDay: 1
				};

				$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
				$scope.format = $scope.formats[0];
				
				$scope.predicates = ['name', 'email', 'company'];
			    $scope.selectedPredicate = $scope.predicates[0];
					  
				$scope.leads = Lead.query(function(data) {
				    // success handler
					console.log("Lead count ",  $scope.leads.length); 	
				
				}, function(error) {
				    // error handler     
					console.log("Error");  
					
				});
			    $scope.orderProp = 'name';
			    
			    $scope.OpenCourse = function(courseId) {
			        $window.alert("Called " + courseId);
			    }

	}]);
	
	controllers.controller('leadEditController', ['$log', '$scope', '$routeParams', '$window', '$location', 'Lead', 'lead', 'LeadService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $location, Lead, lead, LeadService, AlertService) {
					
					$scope.header = 'Leads Management';
					$scope.title = 'Leads';
					$scope.date = {startDate: null, endDate: null};
					$scope.today = function() {
					    $scope.dt = new Date();
					  };
					$scope.today();
					$scope.dateOptions = {
						    formatYear: 'yy',
						    startingDay: 1
					};

					$scope.leadTitle = ['Mr.', 'Ms.', 'Mrs.'];
					$scope.leadSex = ['M', 'F', 'N'];
					 
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.lead = lead;
					
					$scope.predicates = ['name', 'email', 'company'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.orderProp = 'name';
				    
				    $scope.save = function() {
				    	Lead.update({id: lead.id}, $scope.lead, function (result) {
							$log.info('[LeadEditController::save]Lead Update success: ' + angular.toJson(result));																	
							AlertService.add('success', 'Create Lead Success');
							$location.path('lead/view/' + lead.id);
						}, function(response) {
							$log.info('[LeadEditController::save]Lead Update failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
								AlertService.add('warning', 'Update Lead Failed');
							}
						});
					};
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }

		}]);
	
	controllers.controller('leadViewController', ['$log', '$scope', '$routeParams', '$window', '$filter', '$location', 'Lead', 'lead', 'LeadService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $filter, $location, Lead, lead, LeadService, AlertService) {
					
					$scope.header = 'Leads Management';
					$scope.title = 'Leads';
					$scope.date = {startDate: null, endDate: null};
					$scope.today = function() {
					    $scope.dt = new Date();
					  };
					$scope.today();
					$scope.dateOptions = {
						    formatYear: 'yy',
						    startingDay: 1
					};

					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.predicates = ['name', 'email', 'lastUpdated'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
					$scope.lead = lead;
				    $scope.orderProp = 'name';
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.deleteLead = function(lead){
						lead.$delete(function(data, headers){
							$log.info('[LeadViewController::deleteLead]success data: ' + angular.toJson(data));
							AlertService.add('success', 'Delete Lead Success');
							$location.path('lead/list');
						}, function(response){
							$log.info('[LeadViewController::deleteLead]failed response: ' + angular.toJson(response));
							AlertService.add('danger', lead.name + ' ' + 'ERROR_FAIL_DELETE' + ' ' + response.data);
							$location.path('lead/list');
						});
					};

		}]);

	controllers.controller('leadCreateController', ['$log', '$scope', '$filter', '$location', '$routeParams', '$window', 'Lead', 'LeadService', 'AlertService',
			                                          function($log, $scope,  $filter, $location, $routeParams, $window, Lead, LeadService , AlertService) {
					
					$scope.header = 'Leads Management';
					$scope.title = 'Leads';
					$scope.lead = new Lead();
					$scope.date = {startDate: null, endDate: null};
					$scope.today = function() {
					    $scope.dt = new Date();
					  };
					$scope.today();
					$scope.dateOptions = {
						    formatYear: 'yy',
						    startingDay: 1
						  };

					$scope.leadTitle = ['Mr.', 'Ms.', 'Mrs.'];
					$scope.leadSex = ['M', 'F', 'N'];
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.predicates = ['name', 'email', 'lastUpdated'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.orderProp = 'name';
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.save = function() {
						$scope.lead.$save(function(lead, headers) {
							$log.info('[LeadCreateController::save]Lead Save success: ' + angular.toJson(lead));																	
							AlertService.add('success', 'Create Lead Success');
							$location.path('lead/view/' + lead.id);
						}, function(response) {
							$log.info('[LeadCreateController::save]Lead Save failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
								AlertService.add('warning', 'Create Lead Failed');
							}
						});
					};

		}]);
});

/*contactControllers.controller('contactController', ['$scope', 'Contact',
  function($scope, Contact) {
    $scope.contact = Contact.query();
    $scope.orderProp = 'name';    
  }]);

var contactListControllers = angular.module('contactListControllers', []);

contactListControllers.controller('contactListController', ['$scope', '$routeParams', '$window', 'Contact',
  function($scope, $routeParams, $window, Contact) {
	$scope.contacts =   Contact.query();
    $scope.orderProp = 'name';
    
    var entries = Contact.query(function() {
        console.log(entries);
      });

    $scope.OpenCourse = function(courseId) {
        $window.alert("Called " + courseId);
    }
    
  }]);*/
