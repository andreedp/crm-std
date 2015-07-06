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
				
				$scope.predicates = ['name', 'email', 'lastUpdated'];
			    $scope.selectedPredicate = $scope.predicates[0];
					  
				$scope.contacts = Contact.query(function(data) {
				    // success handler
					console.log("Contact count ",  $scope.contacts.length); 
					AlertService.add('success', 'Query Success');
				}, function(error) {
				    // error handler     
					console.log("Error");  
					AlertService.add('warning', 'Query Failed');
				});
			    $scope.orderProp = 'name';
			    
			    $scope.OpenCourse = function(courseId) {
			        $window.alert("Called " + courseId);
			    }

	}]);

	controllers.controller('contactCreateController', ['$log', '$scope', '$filter', '$location', '$routeParams', '$window', 'Contact', 'ContactService',
			                                          function($log, $scope,  $filter, $location, $routeParams, $window, Contact, ContactService) {
					
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
							$location.path('contact/list/');
						}, function(response) {
							$log.info('[ContactCreateController::save]Contact Save failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));
								//AlertService.addDomainErrors(response.data.errors);
							}
							else
							{
								//AlertService.addAlert({type:'danger', message: ' ' + $scope.contact.name + ' '  + response.data});
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
