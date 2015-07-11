define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('contactController', ['$scope', 'Contact',
	                                          function($scope, Contact) {
			
			$scope.header = 'Contact Management';
			$scope.title = 'Contact';
			$scope.contact = Contact.query();
		    $scope.orderProp = 'name';
			
	}]);
	
	controllers.controller('contactListController', ['$scope', '$routeParams', '$window', 'Contact', 'ContactService', 'AlertService',
		                                          function($scope,  $routeParams, $window, Contact, ContactService, AlertService) {
				
				$scope.header = 'Contact Management';
				$scope.title = 'Contact';
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
				
				$scope.predicates = ['name', 'email', 'telephone'];
			    $scope.selectedPredicate = $scope.predicates[0];
					  
				$scope.contacts = Contact.query(function(data) {
				    // success handler
					console.log("Contact count ",  $scope.contacts.length); 	
					AlertService.clear();
					AlertService.add('success', 'Query Contact Success');
				}, function(error) {
				    // error handler     
					console.log("Error");  
					AlertService.clear();
					AlertService.add('warning', 'Query Contact Failed');
				});
			    $scope.orderProp = 'name';
			    
			    $scope.OpenCourse = function(courseId) {
			        $window.alert("Called " + courseId);
			    }

	}]);
	
	controllers.controller('contactViewController', ['$scope', '$routeParams', '$window', 'Contact', 'ContactService', 'AlertService',
			                                          function($scope,  $routeParams, $window, Contact, ContactService, AlertService) {
					
					$scope.header = 'Contact Management';
					$scope.title = 'Contact';
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
						  
					$scope.contacts = Contact.query(function(data) {
					    // success handler
						console.log("Contact count ",  $scope.contacts.length); 
						AlertService.clear();
						AlertService.add('success', 'Create Contact Success');
					}, function(error) {
					    // error handler     
						console.log("Error");  
						AlertService.clear();
						AlertService.add('warning', 'Create Contact Failed');
					});
				    $scope.orderProp = 'name';
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }

		}]);

	controllers.controller('contactCreateController', ['$log', '$scope', '$filter', '$location', '$routeParams', '$window', 'Contact', 'ContactService', 'AlertService',
			                                          function($log, $scope,  $filter, $location, $routeParams, $window, Contact, ContactService , AlertService) {
					
					$scope.header = 'Contact Management';
					$scope.title = 'Contact';
					$scope.contact = new Contact();
					$scope.date = {startDate: null, endDate: null};
					$scope.today = function() {
					    $scope.dt = new Date();
					  };
					$scope.today();
					$scope.dateOptions = {
						    formatYear: 'yy',
						    startingDay: 1
						  };

					$scope.contactTitle = ['Mr.', 'Ms.', 'Mrs.'];
					$scope.contactSex = ['M', 'F', 'N'];
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.predicates = ['name', 'email', 'lastUpdated'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
					$scope.contacts = Contact.query(function(data) {
					    // success handler
						console.log("Contact count ",  $scope.contacts.length);  
					}, function(error) {
					    // error handler
						console.log("Error");  
					});
				    $scope.orderProp = 'name';
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.save = function() {
						$scope.contact.$save(function(contact, headers) {
							$log.info('[ContactCreateController::save]Contact Save success: ' + angular.toJson(contact));										
							AlertService.clear();
							AlertService.add('success', 'Create Contact Success');
							$location.path('contact/list/');
						}, function(response) {
							$log.info('[ContactCreateController::save]Contact Save failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
								AlertService.clear();
								AlertService.add('warning', 'Create Contact Failed');
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
