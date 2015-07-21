define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('accountController', ['$scope', 'Account',
	                                          function($scope, Account) {
			
			$scope.header = 'Account Management';
			$scope.title = 'Account';
			$scope.account = account.query();
		    $scope.orderProp = 'name';
			
	}]);
	
	controllers.controller('accountListController', ['$scope', '$routeParams', '$window', 'Account', 'AccountService', 'AlertService',
		                                          function($scope,  $routeParams, $window, Account, AccountService, AlertService) {
				
				$scope.header = 'Account Management';
				$scope.title = 'Account';
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
				
				$scope.predicates = ['name', 'salesStage', 'type'];
			    $scope.selectedPredicate = $scope.predicates[0];
					  
				$scope.account = Account.query(function(data) {
				    // success handler
					console.log("Account count ",  $scope.account.length); 	
				
				}, function(error) {
				    // error handler     
					console.log("Error");  
					
				});
			    $scope.orderProp = 'name';
			    
			    $scope.OpenCourse = function(courseId) {
			        $window.alert("Called " + courseId);
			    }
			    
			    $scope.rating = {
			        current: 5,
			        max: 10
			    };
			    
			    $scope.rateFunction = function( rating )
			    {
			    	$scope.rating = 5;
			        $scope.rateFunction = function(rating) {
			          alert('Rating selected - ' + rating);
			        };
			    
			    };

	}]);
	
	controllers.controller('accountEditController', ['$log', '$scope', '$routeParams', '$window', '$location', 'Account', 'account', 'account', 'AccountService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $location, Account, account, account, AccountService, AlertService) {
					
					$scope.header = 'Account Management';
					$scope.title = 'Account';
					$scope.date = {startDate: null, endDate: null};
					$scope.today = function() {
					    $scope.dt = new Date();
					  };
					$scope.today();
					$scope.dateOptions = {
						    formatYear: 'yy',
						    startingDay: 1
					};

					$scope.accountAccount = account;
					$scope.accountCompany = ['Avaya', 'Nuance', 'Vasco', 'Datacard', 'Juniper'];					
					$scope.accountIndustry = ['Technology', 'Banking', 'Communications', 'Consulting', 'Government'];
					 
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.account = account;
					
					$scope.predicates = ['name', 'email', 'company'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.orderProp = 'name';
				    
				    $scope.save = function() {
				    	Account.update({id: account.id}, $scope.account, function (result) {
							$log.info('[AccountEditController::save]Account Update success: ' + angular.toJson(result));																	
							AlertService.add('success', 'Create Account Success');
							$location.path('account/view/' + account.id);
						}, function(response) {
							$log.info('[AccountEditController::save]Account Update failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
								AlertService.add('warning', 'Update Account Failed');
							}
						});
					};
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }

		}]);
	
	controllers.controller('accountViewController', ['$log', '$scope', '$routeParams', '$window', '$filter', '$location', 'Account', 'account', 'AccountService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $filter, $location, Account, account, AccountService, AlertService) {
					
					$scope.header = 'Account Management';
					$scope.title = 'Account';
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
						  
					$scope.account = account;
				    $scope.orderProp = 'name';
				    
				    $scope.rating = {
					        current: 5,
					        max: 10
					};
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.deleteAccount = function(account){
						account.$delete(function(data, headers){
							$log.info('[AccountViewController::deleteAccount]success data: ' + angular.toJson(data));
							AlertService.add('success', 'Delete Account Success');
							$location.path('account/list');
						}, function(response){
							$log.info('[AccountViewController::deleteAccount]failed response: ' + angular.toJson(response));
							AlertService.add('danger', account.name + ' ' + 'ERROR_FAIL_DELETE' + ' ' + response.data);
							$location.path('account/list');
						});
					};

		}]);

	controllers.controller('accountCreateController', ['$log', '$scope', '$filter', '$location', '$routeParams', '$window', 'Account', 'AccountService', 'AlertService',
			                                          function($log, $scope,  $filter, $location, $routeParams, $window, Account, AccountService , AlertService) {
					
					$scope.header = 'Account Management';
					$scope.title = 'Account';
					$scope.account = new Account();
					$scope.date = {startDate: null, endDate: null};
					$scope.today = function() {
					    $scope.dt = new Date();
					  };
					$scope.today();
					$scope.dateOptions = {
						    formatYear: 'yy',
						    startingDay: 1
						  };

					$scope.accountCompany = ['Avaya', 'Nuance', 'Vasco', 'Datacard', 'Juniper'];					
					$scope.accountIndustry = ['Technology', 'Banking', 'Communications', 'Consulting', 'Government'];
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.predicates = ['name', 'email', 'lastUpdated'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.orderProp = 'name';
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.save = function() {
						$scope.account.$save(function(account, headers) {
							$log.info('[AccountCreateController::save]Account Save success: ' + angular.toJson(account));																	
							AlertService.add('success', 'Create Account Success');
							$location.path('account/view/' + account.id);
						}, function(response) {
							$log.info('[AccountCreateController::save]Account Save failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
								AlertService.add('warning', 'Create Account Failed');
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
