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
				
				}, function(error) {
				    // error handler     
					console.log("Error");  
					
				});
			    $scope.orderProp = 'name';
			    
			    $scope.OpenCourse = function(courseId) {
			        $window.alert("Called " + courseId);
			    }

	}]);
	
	controllers.controller('contactEditController', ['$log', '$scope', '$routeParams', '$window', '$location', 'Contact', 'contact', 'ContactService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $location, Contact, contact, ContactService, AlertService) {
					
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

					$scope.contactTitle = ['Mr.', 'Ms.', 'Mrs.'];
					$scope.contactSex = ['M', 'F', 'N'];
					 
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.contact = contact;
					
					$scope.predicates = ['name', 'email', 'telephone'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.orderProp = 'name';
				    
				    $scope.save = function() {
				    	Contact.update({id: contact.id}, $scope.contact, function (result) {
							$log.info('[ContactEditController::save]Contact Update success: ' + angular.toJson(result));																	
							AlertService.add('success', 'Create Update Success');
							$location.path('contact/view/' + contact.id);
						}, function(response) {
							$log.info('[ContactEditController::save]Contact Update failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
								AlertService.add('warning', 'Update Contact Failed');
							}
						});
					};
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }

		}]);
	
	controllers.controller('contactViewController', ['$log', '$scope', '$routeParams', '$window', '$filter', '$location', 'Contact', 'contact', 'ContactService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $filter, $location, Contact, contact, ContactService, AlertService) {
					
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
						  
					$scope.contact = contact;
				    $scope.orderProp = 'name';
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.deleteContact = function(contact){
						contact.$delete(function(data, headers){
							$log.info('[ContactViewController::deleteContact]success data: ' + angular.toJson(data));
							AlertService.add('success', 'Delete Contact Success');
							$location.path('contact/list');
						}, function(response){
							$log.info('[ContactViewController::deleteContact]failed response: ' + angular.toJson(response));
							AlertService.add('danger', contact.name + ' ' + 'ERROR_FAIL_DELETE' + ' ' + response.data);
							$location.path('contact/list');
						});
					};

		}]);

	controllers.controller('contactCreateController', ['$log', '$scope', '$filter', '$location', '$routeParams', '$window', 'Contact', 'lead', 'account', 'ContactService', 'AlertService',
			                                          function($log, $scope,  $filter, $location, $routeParams, $window, Contact, lead, account, ContactService , AlertService) {
					
					$scope.header = 'Contact Management';
					$scope.title = 'Contact';
					$scope.contact = new Contact();
					

					$scope.minDate = new Date('1990/01/01');
					$scope.maxDate = new Date('2050/01/01');
					$scope.dateFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'yyyy-MM-dd', 'shortDate'];
					$scope.dateFormat = $scope.dateFormats[1];
					$scope.dateOptions = {
							'year-format': "'yy'",
							'starting-day': 1
					};
					
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
					$scope.contactSource = ['Campaign', 'Email', 'Web Site', 'Direct Mail', 'Partner', 'Employee', 'Exisiting Customer', 'Other'];
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.predicates = ['name', 'email', 'lastUpdated'];
				    $scope.selectedPredicate = $scope.predicates[0];
					
					$scope.contactAccount = account;
				    
				    $scope.orderProp = 'name';
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
					if(lead)
					{
						$scope.lead = lead;
						$scope.contact.name = $scope.lead.name
						$scope.contact.sex = $scope.lead.sex
						$scope.contact.title = $scope.lead.title
						$scope.contact.email = $scope.lead.email
						$scope.contact.description = $scope.lead.description
						
					}
				    
				    $scope.save = function() {
						$scope.contact.$save(function(contact, headers) {
							$log.info('[ContactCreateController::save]Contact Save success: ' + angular.toJson(contact));																	
							AlertService.add('success', 'Create Contact Success');
							$location.path('contact/view/' + contact.id);
						}, function(response) {
							$log.info('[ContactCreateController::save]Contact Save failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
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
