define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('campaignController', ['$scope', 'Campaign',
	                                          function($scope, Campaign) {
			
			$scope.header = 'Campaign Management';
			$scope.title = 'Campaign';
			$scope.campaign = campaign.query();
		    $scope.orderProp = 'name';
			
	}]);
	
	controllers.controller('campaignListController', ['$scope', '$routeParams', '$window', 'Campaign', 'CampaignService', 'AlertService',
		                                          function($scope,  $routeParams, $window, Campaign, CampaignService, AlertService) {
				
				$scope.header = 'Campaign Management';
				$scope.title = 'Campaign';
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
					  
				$scope.campaign = Campaign.query(function(data) {
				    // success handler
					console.log("Campaign count ",  $scope.campaign.length); 	
				
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
	
	controllers.controller('campaignEditController', ['$log', '$scope', '$routeParams', '$window', '$location', 'Campaign', 'campaign', 'account', 'CampaignService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $location, Campaign, campaign, account, CampaignService, AlertService) {
					
					$scope.header = 'Campaign Management';
					$scope.title = 'Campaign';
					$scope.date = {startDate: null, endDate: null};
					$scope.today = function() {
					    $scope.dt = new Date();
					  };
					$scope.today();
					$scope.dateOptions = {
						    formatYear: 'yy',
						    startingDay: 1
					};

					$scope.campaignAccount = account;
					$scope.campaignSalesStage = ['Prospecting', 'Qualification', 'Negotiation', 'Closed Won', 'Closed Lost'];
					 
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.campaign = campaign;
					
					$scope.predicates = ['name', 'email', 'company'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.orderProp = 'name';
				    
				    $scope.save = function() {
				    	Campaign.update({id: campaign.id}, $scope.campaign, function (result) {
							$log.info('[CampaignEditController::save]Campaign Update success: ' + angular.toJson(result));																	
							AlertService.add('success', 'Create Campaign Success');
							$location.path('campaign/view/' + campaign.id);
						}, function(response) {
							$log.info('[CampaignEditController::save]Campaign Update failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
								AlertService.add('warning', 'Update Campaign Failed');
							}
						});
					};
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }

		}]);
	
	controllers.controller('campaignViewController', ['$log', '$scope', '$routeParams', '$window', '$filter', '$location', 'Campaign', 'campaign', 'CampaignService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $filter, $location, Campaign, campaign, CampaignService, AlertService) {
					
					$scope.header = 'Campaign Management';
					$scope.title = 'Campaign';
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
						  
					$scope.campaign = campaign;
				    $scope.orderProp = 'name';
				    
				    $scope.rating = {
					        current: 5,
					        max: 10
					};
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.deleteCampaign = function(campaign){
						campaign.$delete(function(data, headers){
							$log.info('[CampaignViewController::deleteCampaign]success data: ' + angular.toJson(data));
							AlertService.add('success', 'Delete Campaign Success');
							$location.path('campaign/list');
						}, function(response){
							$log.info('[CampaignViewController::deleteCampaign]failed response: ' + angular.toJson(response));
							AlertService.add('danger', campaign.name + ' ' + 'ERROR_FAIL_DELETE' + ' ' + response.data);
							$location.path('campaign/list');
						});
					};

		}]);

	controllers.controller('campaignCreateController', ['$log', '$scope', '$filter', '$location', '$routeParams', '$window', 'Campaign', 'CampaignService', 'AlertService',
			                                          function($log, $scope,  $filter, $location, $routeParams, $window, Campaign, CampaignService , AlertService) {
					
					$scope.header = 'Campaign Management';
					$scope.title = 'Campaign';
					$scope.campaign = new Campaign();
					$scope.date = {startDate: null, endDate: null};
					$scope.today = function() {
					    $scope.dt = new Date();
					  };
					$scope.today();
					$scope.dateOptions = {
						    formatYear: 'yy',
						    startingDay: 1
						  };

					$scope.campaignStatus = ['Planning', 'Active', 'Inactive', 'Complete', 'In Queue', 'Sending'];
					$scope.campaignType = ['Telesales', 'Email', 'Web', 'Mail', 'Print', 'Radio', 'NewsLetter', 'Television'];				
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.predicates = ['name', 'email', 'lastUpdated'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.orderProp = 'name';
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.save = function() {
						$scope.campaign.$save(function(campaign, headers) {
							$log.info('[CampaignCreateController::save]Campaign Save success: ' + angular.toJson(campaign));																	
							AlertService.add('success', 'Create Campaign Success');
							$location.path('campaign/view/' + campaign.id);
						}, function(response) {
							$log.info('[CampaignCreateController::save]Campaign Save failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
								AlertService.add('warning', 'Create Campaign Failed');
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
