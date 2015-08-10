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
	
	controllers.controller('leadEditController', ['$log', '$scope', '$routeParams', '$window', '$modal', '$location', 'campaign', 'Lead', 'lead', 'titles', 'sex', 'leadSource', 'leadStatus', 'users', 'LeadService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $modal, $location, campaign, Lead, lead, titles, sex, leadSource, leadStatus, users, LeadService, AlertService) {
					
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

				    $scope.leadTitle = [];
					$scope.leadSex = [];
					$scope.leadSource = [];
					$scope.leadStatus = [];
					$scope.leadUser = users;
					$scope.leadCampaign = campaign;
					
					angular.forEach(titles, function(titles){
						$scope.leadTitle.push(titles.valueName);
					});
					
					angular.forEach(sex, function(sex){
						$scope.leadSex.push(sex.valueName);
					});
				    
					angular.forEach(leadSource, function(leadSource){
						$scope.leadSource.push(leadSource.valueName);
					});
					
					angular.forEach(leadStatus, function(leadStatus){
						$scope.leadStatus.push(leadStatus.valueName);
					});
					
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.lead = lead;
					
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
				            return $scope.leadUser;
				          }
				        }
				      });

				      modalInstance.result.then(function (selectedItem) {
				        $scope.lead.assignTo = selectedItem;
				      }, function () {
				        $log.info('Modal dismissed at: ' + new Date());
				        $log.info('contact: ' +  $scope.lead.assignTo.name);
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
					            return $scope.leadCampaign;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.lead.campaign = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.lead.campaign.name);
					      });
					    };
				   
				    LeadService.calculateRating($scope.lead);				    
				    
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
	
	controllers.controller('leadViewController', ['$log', '$scope', '$routeParams', '$window', '$filter', '$location', 'Lead', 'lead', 'task', 'LeadService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $filter, $location, Lead, lead, task, LeadService, AlertService) {
					
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
					$scope.task = task;
					
				    $scope.orderProp = 'name';
				    
				    $scope.rating = {
					        current: 5,
					        max: 10
					};
								   				    
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

	controllers.controller('leadCreateController', ['$log', '$scope', '$filter', '$location', '$routeParams', '$modal', '$window', 'campaign', 'Lead', 'titles', 'sex', 'leadSource', 'leadStatus', 'users', 'LeadService', 'AlertService',
			                                          function($log, $scope,  $filter, $location, $routeParams, $modal, $window, campaign, Lead, titles, sex, leadSource, leadStatus, users, LeadService , AlertService) {
					
					$scope.header = 'Leads Management';
					$scope.title = 'Leads';
					$scope.lead = new Lead();
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
					    
				    $scope.leadTitle = [];
					$scope.leadSex = [];
					$scope.leadSource = [];
					$scope.leadStatus = [];
					$scope.leadUser = users;
					$scope.leadCampaign = campaign;
					
					angular.forEach(titles, function(titles){
						$scope.leadTitle.push(titles.valueName);
					});
					
					angular.forEach(sex, function(sex){
						$scope.leadSex.push(sex.valueName);
					});
				    
					angular.forEach(leadSource, function(leadSource){
						$scope.leadSource.push(leadSource.valueName);
					});
					
					angular.forEach(leadStatus, function(leadStatus){
						$scope.leadStatus.push(leadStatus.valueName);
					});
					
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.predicates = ['name', 'email', 'lastUpdated'];
				    $scope.selectedPredicate = $scope.predicates[0];
								    
				    $scope.orderProp = 'name';
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    LeadService.calculateRating($scope.lead);
				    
				    $scope.openUser = function (size) {

					      var modalInstance = $modal.open({
					        animation: $scope.animationsEnabled,
					        templateUrl: 'app/templates/searchFormUser.html',
					        controller: 'modalInstanceController',
					        size: size,
					        resolve: {
					          items: function () {
					            return $scope.leadUser;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.lead.assignTo = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.lead.assignTo.name);
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
					            return $scope.leadCampaign;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.lead.campaign = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.lead.campaign.name);
					      });
					    };
					   
					    
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
