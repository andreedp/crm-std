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
	
	controllers.controller('campaignEditController', ['$log', '$scope', '$filter', '$routeParams', '$window', '$modal', '$location', 'Campaign', 'campaign', 'campaignStatus', 'campaignType', 'users', 'CampaignService', 'AlertService',
			                                          function($log, $scope, $filter, $routeParams, $window, $modal, $location, Campaign, campaign, campaignStatus, campaignType, users, CampaignService, AlertService) {
					
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

					$scope.campaignUser = users;
					$scope.campaignStatus = [];
					$scope.campaignType = [];
					
					angular.forEach(campaignStatus, function(campStat){
						$scope.campaignStatus.push(campStat.valueName);
					});
					
					angular.forEach(campaignType, function(campType){
						$scope.campaignType.push(campType.valueName);
					});
					 
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.campaign = campaign;
					
					$scope.predicates = ['name', 'email', 'company'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.orderProp = 'name';
				    
				    $scope.openUser = function (size) {

					      var modalInstance = $modal.open({
					        animation: $scope.animationsEnabled,
					        templateUrl: 'app/templates/searchFormUser.html',
					        controller: 'modalInstanceController',
					        size: size,
					        resolve: {
					          items: function () {
					            return $scope.campaignUser;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.campaign.assignTo = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.campaign.assignTo.username);
					      });
				    };
				    
				    $scope.save = function() {
				    	
				    	if($scope.campaign.startDate)
				    		$scope.campaign.startDate = $filter('date')($scope.campaign.startDate, 'yyyy-MM-ddTHH:mm:ssZ').toString();										    	
				    	
				    	if($scope.campaign.endDate)
				    		$scope.campaign.endDate = $filter('date')($scope.campaign.endDate, 'yyyy-MM-ddTHH:mm:ssZ').toString();										    	
				    	
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
	
	controllers.controller('campaignViewController', ['$log', '$scope', '$routeParams', '$window', '$filter', '$location', 'Campaign', 'campaign', 'task', 'CampaignService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $filter, $location, Campaign, campaign, task, CampaignService, AlertService) {
					
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
					$scope.task = task;
					
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

	controllers.controller('campaignCreateController', ['$log', '$scope', '$filter', '$location', '$routeParams', '$window', '$modal', 'Campaign', 'campaignStatus', 'campaignType', 'users', 'CampaignService', 'AlertService',
			                                          function($log, $scope,  $filter, $location, $routeParams, $window, $modal, Campaign, campaignStatus, campaignType, users, CampaignService , AlertService) {
					
					$scope.header = 'Campaign Management';
					$scope.title = 'Campaign';
					$scope.campaign = new Campaign();
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
										
					$scope.campaignUser = users;
					
					$scope.campaignStatus = [];
					$scope.campaignType = [];
					
					angular.forEach(campaignStatus, function(campStat){
						$scope.campaignStatus.push(campStat.valueName);
					});
					
					angular.forEach(campaignType, function(campType){
						$scope.campaignType.push(campType.valueName);
					});
					
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.predicates = ['name', 'email', 'lastUpdated'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.orderProp = 'name';
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.openUser = function (size) {

					      var modalInstance = $modal.open({
					        animation: $scope.animationsEnabled,
					        templateUrl: 'app/templates/searchFormUser.html',
					        controller: 'modalInstanceController',
					        size: size,
					        resolve: {
					          items: function () {
					            return $scope.campaignUser;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.campaign.assignTo = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.campaign.assignTo.username);
					      });
				    };
				    
				    $scope.save = function() {
				    	
				    	if($scope.campaign.startDate)
				    		$scope.campaign.startDate = $filter('date')($scope.campaign.startDate, 'yyyy-MM-ddTHH:mm:ssZ').toString();										    	
				    	
				    	if($scope.campaign.endDate)
				    		$scope.campaign.endDate = $filter('date')($scope.campaign.endDate, 'yyyy-MM-ddTHH:mm:ssZ').toString();										    	
				    	
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
