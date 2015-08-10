define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('opportunityController', ['$scope', 'Opportunity',
	                                          function($scope, Opportunity) {
			
			$scope.header = 'Opportunity Management';
			$scope.title = 'Opportunity';
			$scope.opportunity = opportunity.query();
		    $scope.orderProp = 'name';
			
	}]);
	
	controllers.controller('opportunityListController', ['$scope', '$routeParams', '$window', 'Opportunity', 'OpportunityService', 'AlertService',
		                                          function($scope,  $routeParams, $window, Opportunity, OpportunityService, AlertService) {
				
				$scope.header = 'Opportunity Management';
				$scope.title = 'Opportunity';
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
					  
				$scope.opportunity = Opportunity.query(function(data) {
				    // success handler
					console.log("Opportunity count ",  $scope.opportunity.length); 	
				
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
	
	controllers.controller('opportunityEditController', ['$log', '$scope', '$filter', '$routeParams', '$window', '$modal', '$location', 'Opportunity', 'opportunity', 'account', 'campaign', 'salesStage', 'leadSource', 'type', 'users', 'OpportunityService', 'AlertService',
			                                          function($log, $scope, $filter, $routeParams, $window, $modal, $location, Opportunity, opportunity, account, campaign, salesStage, leadSource, type, users, OpportunityService, AlertService) {
					
					$scope.header = 'Opportunity Management';
					$scope.title = 'Opportunity';
					$scope.date = {startDate: null, endDate: null};
					$scope.today = function() {
					    $scope.dt = new Date();
					  };
					$scope.today();
					$scope.dateOptions = {
						    formatYear: 'yy',
						    startingDay: 1
					};

					$scope.opportunityUser = users;
					$scope.opportunityAccount = account;
					$scope.contactCampaign = campaign;
					
					$scope.opportunitySalesStage = [];
					$scope.opportunitySource = [];
					$scope.opportunityType = [];
					
					angular.forEach(salesStage, function(salesStage){
						$scope.opportunitySalesStage.push(salesStage.valueName);
					});
					
					angular.forEach(leadSource, function(leadSource){
						$scope.opportunitySource.push(leadSource.valueName);
					});
					
					angular.forEach(type, function(type){
						$scope.opportunityType.push(type.valueName);
					});
					 
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.opportunity = opportunity;
					
					$scope.predicates = ['name', 'email', 'company'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.orderProp = 'name';
				    
				    $scope.openAccount = function (size) {

					      var modalInstance = $modal.open({
					        animation: $scope.animationsEnabled,
					        templateUrl: 'app/templates/searchFormAccount.html',
					        controller: 'modalInstanceController',
					        size: size,
					        resolve: {
					          items: function () {
					            return $scope.opportunityAccount;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.opportunity.account = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.opportunity.account.name);
					      });
				    };
				    
				    $scope.openUser = function (size) {

					      var modalInstance = $modal.open({
					        animation: $scope.animationsEnabled,
					        templateUrl: 'app/templates/searchFormUser.html',
					        controller: 'modalInstanceController',
					        size: size,
					        resolve: {
					          items: function () {
					            return $scope.opportunityUser;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.opportunity.assignTo = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.opportunity.assignTo.name);
					      });
				    };
				    
				    $scope.openCampaign = function (size) {

					      var modalInstance = $modal.open({
					        animation: $scope.animationsEnabled,
					        templateUrl: 'app/templates/searchFormCampaign.html',
					        controller: 'modalInstanceController',
					        size: size,
					        resolve: {
					          items: function () {
					            return $scope.contactCampaign;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.contact.campaign = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.contact.campaign.name);
					      });
				    };
				    
				    $scope.save = function() {
				    	
				    	if($scope.opportunity.closeDate)
				    		$scope.opportunity.closeDate = $filter('date')($scope.opportunity.closeDate, 'yyyy-MM-ddTHH:mm:ssZ').toString();										    	
				    	
				    	Opportunity.update({id: opportunity.id}, $scope.opportunity, function (result) {
							$log.info('[OpportunityEditController::save]Opportunity Update success: ' + angular.toJson(result));																	
							AlertService.add('success', 'Create Opportunity Success');
							$location.path('opportunity/view/' + opportunity.id);
						}, function(response) {
							$log.info('[OpportunityEditController::save]Opportunity Update failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
								AlertService.add('warning', 'Update Opportunity Failed');
							}
						});
					};
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }

		}]);
	
	controllers.controller('opportunityViewController', ['$log', '$scope', '$routeParams', '$window', '$filter', '$location', 'Opportunity', 'opportunity', 'task', 'OpportunityService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $filter, $location, Opportunity, opportunity, task, OpportunityService, AlertService) {
					
					$scope.header = 'Opportunity Management';
					$scope.title = 'Opportunity';
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
						  
					$scope.opportunity = opportunity;
					$scope.task = task;
					
				    $scope.orderProp = 'name';
				    
				    $scope.rating = {
					        current: 5,
					        max: 10
					};
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.deleteOpportunity = function(opportunity){
						opportunity.$delete(function(data, headers){
							$log.info('[OpportunityViewController::deleteOpportunity]success data: ' + angular.toJson(data));
							AlertService.add('success', 'Delete Opportunity Success');
							$location.path('opportunity/list');
						}, function(response){
							$log.info('[OpportunityViewController::deleteOpportunity]failed response: ' + angular.toJson(response));
							AlertService.add('danger', opportunity.name + ' ' + 'ERROR_FAIL_DELETE' + ' ' + response.data);
							$location.path('opportunity/list');
						});
					};

		}]);

	controllers.controller('opportunityCreateController', ['$log', '$scope', '$filter', '$location', '$routeParams', '$window', '$modal', 'Opportunity', 'account', 'campaign', 'salesStage', 'leadSource', 'type', 'users', 'OpportunityService', 'AlertService',
			                                          function($log, $scope,  $filter, $location, $routeParams, $window, $modal, Opportunity, account, campaign, salesStage, leadSource, type, users, OpportunityService , AlertService) {
					
					$scope.header = 'Opportunity Management';
					$scope.title = 'Opportunity';
					$scope.opportunity = new Opportunity();
					$scope.date = {startDate: null, endDate: null};
					$scope.today = function() {
					    $scope.dt = new Date();
					  };
					$scope.today();
					$scope.minDate = new Date('1990/01/01');
					$scope.maxDate = new Date('2050/01/01');
					$scope.dateFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'yyyy-MM-dd', 'shortDate'];
					$scope.dateFormat = $scope.dateFormats[1];
					$scope.dateOptions = {
							'year-format': "'yy'",
							'starting-day': 1
					};

					$scope.opportunityUser = users;
					$scope.opportunityAccount = account;
					$scope.opportunityCampaign = campaign;
					
					$scope.opportunitySalesStage = [];
					$scope.opportunitySource = [];
					$scope.opportunityType = [];
					
					angular.forEach(salesStage, function(salesStage){
						$scope.opportunitySalesStage.push(salesStage.valueName);
					});
					
					angular.forEach(leadSource, function(leadSource){
						$scope.opportunitySource.push(leadSource.valueName);
					});
					
					angular.forEach(type, function(type){
						$scope.opportunityType.push(type.valueName);
					});
					
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.predicates = ['name', 'email', 'lastUpdated'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.orderProp = 'name';
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.openAccount = function (size) {

					      var modalInstance = $modal.open({
					        animation: $scope.animationsEnabled,
					        templateUrl: 'app/templates/searchFormAccount.html',
					        controller: 'modalInstanceController',
					        size: size,
					        resolve: {
					          items: function () {
					            return $scope.opportunityAccount;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.opportunity.account = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.opportunity.account.name);
					      });
				    };
				    
				    $scope.openUser = function (size) {

					      var modalInstance = $modal.open({
					        animation: $scope.animationsEnabled,
					        templateUrl: 'app/templates/searchFormUser.html',
					        controller: 'modalInstanceController',
					        size: size,
					        resolve: {
					          items: function () {
					            return $scope.opportunityUser;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.opportunity.assignTo = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.opportunity.assignTo.name);
					      });
				    };
				    
				    $scope.openCampaign = function (size) {

					      var modalInstance = $modal.open({
					        animation: $scope.animationsEnabled,
					        templateUrl: 'app/templates/searchFormCampaign.html',
					        controller: 'modalInstanceController',
					        size: size,
					        resolve: {
					          items: function () {
					            return $scope.opportunityCampaign;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.opportunity.campaign = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.opportunity.campaign.name);
					      });
				    };
				    
				    $scope.save = function() {
				    	
				    	if($scope.opportunity.closeDate)
				    		$scope.opportunity.closeDate = $filter('date')($scope.opportunity.closeDate, 'yyyy-MM-ddTHH:mm:ssZ').toString();						
				    	
						$scope.opportunity.$save(function(opportunity, headers) {
							$log.info('[OpportunityCreateController::save]Opportunity Save success: ' + angular.toJson(opportunity));																	
							AlertService.add('success', 'Create Opportunity Success');
							$location.path('opportunity/view/' + opportunity.id);
						}, function(response) {
							$log.info('[OpportunityCreateController::save]Opportunity Save failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
								AlertService.add('warning', 'Create Opportunity Failed');
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
