define(['controllers/controllers'],
		function(controllers) {
	controllers.controller('taskController', ['$scope', 'Task',
	                                          function($scope, Task) {
			
			$scope.header = 'Task Management';
			$scope.title = 'Task';
			$scope.task = task.query();
		    $scope.orderProp = 'name';
			
	}]);
	
	controllers.controller('taskListController', ['$scope', '$routeParams', '$window', 'Task', 'TaskService', 'AlertService',
		                                          function($scope,  $routeParams, $window, Task, TaskService, AlertService) {
				
				$scope.header = 'Task Management';
				$scope.title = 'Task';
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
					  
				$scope.task = Task.query(function(data) {
				    // success handler
					console.log("Task count ",  $scope.task.length); 	
				
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
	
	controllers.controller('taskEditController', ['$log', '$scope', '$routeParams', '$window', '$modal', '$location', 'Task', 'task', 'account', 'campaign', 'contact', 'leads', 'opportunity', 'users', 'taskStatus', 'relatedTo', 'TaskService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $modal, $location, Task, task, account, campaign, contact, leads, opportunity, users, taskStatus, relatedTo, TaskService, AlertService) {
					
					$scope.header = 'Task Management';
					$scope.title = 'Task';
					$scope.date = {startDate: null, endDate: null};
					$scope.today = function() {
					    $scope.dt = new Date();
					  };
					$scope.today();
					$scope.dateOptions = {
						    formatYear: 'yy',
						    startingDay: 1
					};

					$scope.taskRelatedTo = [];
					$scope.taskStatus = [];
					$scope.taskRelatedToSelected = null;
					$scope.taskContactName = contact;
					$scope.taskUser = users;
					 
					angular.forEach(taskStatus, function(taskStatus){
						$scope.taskStatus.push(taskStatus.valueName);
					});
										
					angular.forEach(relatedTo, function(relatedTo){
						$scope.taskRelatedTo.push(relatedTo.valueName);
					});
					
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.task = task;
					
					if($scope.task.relatedTo == 'Account')
			    	  {
						$scope.taskRelatedToSelected = $scope.task.account;
		    		  		
			    	  }
			    	  else if($scope.task.relatedTo == 'Campaign')
			    	  {
			    		  $scope.taskRelatedToSelected = $scope.task.campaign;
			    		  
			    	  }
			    	  else if($scope.task.relatedTo == 'Contact')
			    	  {
			    		  $scope.taskRelatedToSelected = $scope.task.contact;
			    			
			    	  }
			    	  else if($scope.task.relatedTo == 'Lead')
			    	  {
			    		  $scope.taskRelatedToSelected = $scope.task.lead;
			    		  
			    	  }
			    	  else if($scope.task.relatedTo == 'Opportunity')
			    	  {
			    		  $scope.taskRelatedToSelected = $scope.task.opportunity;
				    		
			    	  }
					
					$scope.predicates = ['name', 'email', 'company'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.animationsEnabled = true;

				    $scope.openContact = function (size) {

				      var modalInstance = $modal.open({
				        animation: $scope.animationsEnabled,
				        templateUrl: 'app/templates/searchFormContact.html',
				        controller: 'modalInstanceController',
				        size: size,
				        resolve: {
				          items: function () {
				            return $scope.taskContactName;
				          }
				        }
				      });

				      modalInstance.result.then(function (selectedItem) {
				        $scope.task.contactName = selectedItem;
				      }, function () {
				        $log.info('Modal dismissed at: ' + new Date());
				        $log.info('contact: ' +  $scope.task.contactName.name);
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
					            return $scope.taskUser;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.task.assignTo = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.task.assignTo.name);
					      });
					    };
				    
				    $scope.openRelatedTo = function (size) {

			    	  var template = null;
			    	  var selectedData = null;
			    	  
			    	  if($scope.task.relatedTo == 'Account')
			    	  {
			    		  	template = 'app/templates/searchFormAccount.html';
		    		  		selectedData = account;
			    	  }
			    	  else if($scope.task.relatedTo == 'Campaign')
			    	  {
				    		template = 'app/templates/searchFormCampaign.html';
				    		selectedData = campaign;
			    	  }
			    	  else if($scope.task.relatedTo == 'Contact')
			    	  {
				    		template = 'app/templates/searchFormContact.html';
			    			selectedData = contact;
			    	  }
			    	  else if($scope.task.relatedTo == 'Lead')
			    	  {
				    		template = 'app/templates/searchFormLead.html';
				    		selectedData = leads;
			    	  }
			    	  else if($scope.task.relatedTo == 'Opportunity')
			    	  {
				    		template = 'app/templates/searchFormOpportunity.html';
				    		selectedData = opportunity;
			    	  }			    	  
			    	  			    	  				    	
				      var modalInstance = $modal.open({
				        animation: $scope.animationsEnabled,
				        templateUrl: template,
				        controller: 'modalInstanceController',
				        size: size,
				        resolve: {
				          items: function () {
				            return selectedData;
				          }
				        }
				      });

				      modalInstance.result.then(function (selectedItem) {
				    	  $scope.taskRelatedToSelected = selectedItem;
				    	  
				    	  if($scope.task.relatedTo == 'Account')
				    	  {
				    		  $scope.task.account = $scope.taskRelatedToSelected;
			    		  		
				    	  }
				    	  else if($scope.task.relatedTo == 'Campaign')
				    	  {
				    		  $scope.task.campaign = $scope.taskRelatedToSelected;
				    		  
				    	  }
				    	  else if($scope.task.relatedTo == 'Contact')
				    	  {
				    		  $scope.task.contact = $scope.taskRelatedToSelected;
				    			
				    	  }
				    	  else if($scope.task.relatedTo == 'Lead')
				    	  {
				    		  $scope.task.lead = $scope.taskRelatedToSelected;
				    		  
				    	  }
				    	  else if($scope.task.relatedTo == 'Opportunity')
				    	  {
				    		  $scope.task.opportunity = $scope.taskRelatedToSelected;
					    		
				    	  }
				      }, function () {				    	  				    	  
				    	  
				          $log.info('Modal dismissed at: ' + new Date());
				          $log.info('contact: ' +  $scope.taskRelatedToSelected.name);
				      });
				    };
				    
				    $scope.orderProp = 'name';
				    
				    $scope.save = function() {
				    	if($scope.task.startDate)
				    		$scope.task.startDate = $filter('date')($scope.task.startDate, 'yyyy-MM-ddTHH:mm:ssZ').toString();
				    	if($scope.task.dueDate)			    	
				    		$scope.task.dueDate = $filter('date')($scope.task.dueDate, 'yyyy-MM-ddTHH:mm:ssZ').toString();
						
				    	Task.update({id: task.id}, $scope.task, function (result) {
							$log.info('[TaskEditController::save]Task Update success: ' + angular.toJson(result));																	
							AlertService.add('success', 'Create Task Success');
							$location.path('task/view/' + task.id);
						}, function(response) {
							$log.info('[TaskEditController::save]Task Update failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
								AlertService.add('warning', 'Update Task Failed');
							}
						});
					};
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }

		}]);
	
	controllers.controller('taskViewController', ['$log', '$scope', '$routeParams', '$window', '$filter', '$location', 'Task', 'task', 'TaskService', 'AlertService',
			                                          function($log, $scope,  $routeParams, $window, $filter, $location, Task, task, TaskService, AlertService) {
					
					$scope.header = 'Task Management';
					$scope.title = 'Task';
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
						  
					$scope.task = task;
				    $scope.orderProp = 'name';
				    
				    $scope.rating = {
					        current: 5,
					        max: 10
					};
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.deleteTask = function(task){
						task.$delete(function(data, headers){
							$log.info('[TaskViewController::deleteTask]success data: ' + angular.toJson(data));
							AlertService.add('success', 'Delete Task Success');
							$location.path('task/list');
						}, function(response){
							$log.info('[TaskViewController::deleteTask]failed response: ' + angular.toJson(response));
							AlertService.add('danger', task.name + ' ' + 'ERROR_FAIL_DELETE' + ' ' + response.data);
							$location.path('task/list');
						});
					};

		}]);

	controllers.controller('taskCreateController', ['$log', '$scope', '$filter', '$location', '$routeParams', '$window', '$modal', 'Task', 'account', 'campaign', 'contact', 'leads', 'opportunity', 'users', 'taskStatus', 'relatedTo', 'priority', 'TaskService', 'AlertService',
			                                          function($log, $scope,  $filter, $location, $routeParams, $window, $modal, Task, account, campaign, contact, leads, opportunity, users, taskStatus, relatedTo, priority, TaskService , AlertService) {
					
					$scope.header = 'Task Management';
					$scope.title = 'Task';
					$scope.task = new Task();
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
					
					// Disable weekend selection
					  $scope.disabled = function(date, mode) {
					    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
					  };
					
					$scope.taskRelatedTo = [];
					$scope.taskStatus = [];
					$scope.taskPriority = [];
					$scope.taskRelatedToSelected = null;
					$scope.taskContactName = contact;
					$scope.taskUser = users;
					
					angular.forEach(taskStatus, function(taskStatus){
						$scope.taskStatus.push(taskStatus.valueName);
					});
					
					angular.forEach(relatedTo, function(relatedTo){
						$scope.taskRelatedTo.push(relatedTo.valueName);
					});
					
					angular.forEach(priority, function(priority){
						$scope.taskPriority.push(priority.valueName);
					});
					
					$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					$scope.format = $scope.formats[0];
					
					$scope.predicates = ['name', 'email', 'lastUpdated'];
				    $scope.selectedPredicate = $scope.predicates[0];
						  
				    $scope.orderProp = 'name';
				    
				    $scope.animationsEnabled = true;

				    $scope.openContact = function (size) {

				      var modalInstance = $modal.open({
				        animation: $scope.animationsEnabled,
				        templateUrl: 'app/templates/searchFormContact.html',
				        controller: 'modalInstanceController',
				        size: size,
				        resolve: {
				          items: function () {
				            return $scope.taskContactName;
				          }
				        }
				      });

				      modalInstance.result.then(function (selectedItem) {
				        $scope.task.contactName = selectedItem;
				      }, function () {
				        $log.info('Modal dismissed at: ' + new Date());
				        $log.info('contact: ' +  $scope.task.contactName.name);
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
					            return $scope.taskUser;
					          }
					        }
					      });

					      modalInstance.result.then(function (selectedItem) {
					        $scope.task.assignTo = selectedItem;
					      }, function () {
					        $log.info('Modal dismissed at: ' + new Date());
					        $log.info('contact: ' +  $scope.task.assignTo.name);
					      });
					    };
				    
				    $scope.openRelatedTo = function (size) {

			    	  var template = null;
			    	  var selectedData = null;
			    	  
			    	  if($scope.task.relatedTo == 'Account')
			    	  {
			    		  	template = 'app/templates/searchFormAccount.html';
		    		  		selectedData = account;
			    	  }
			    	  else if($scope.task.relatedTo == 'Campaign')
			    	  {
				    		template = 'app/templates/searchFormCampaign.html';
				    		selectedData = campaign;
			    	  }
			    	  else if($scope.task.relatedTo == 'Contact')
			    	  {
				    		template = 'app/templates/searchFormContact.html';
			    			selectedData = contact;
			    	  }
			    	  else if($scope.task.relatedTo == 'Lead')
			    	  {
				    		template = 'app/templates/searchFormLead.html';
				    		selectedData = leads;
			    	  }
			    	  else if($scope.task.relatedTo == 'Opportunity')
			    	  {
				    		template = 'app/templates/searchFormOpportunity.html';
				    		selectedData = opportunity;
			    	  }			    	  
			    	  			    	  				    	
				      var modalInstance = $modal.open({
				        animation: $scope.animationsEnabled,
				        templateUrl: template,
				        controller: 'modalInstanceController',
				        size: size,
				        resolve: {
				          items: function () {
				            return selectedData;
				          }
				        }
				      });

				      modalInstance.result.then(function (selectedItem) {
				    	  $scope.taskRelatedToSelected = selectedItem;
				    	  
				    	  if($scope.task.relatedTo == 'Account')
				    	  {
				    		  $scope.task.account = $scope.taskRelatedToSelected;
			    		  		
				    	  }
				    	  else if($scope.task.relatedTo == 'Campaign')
				    	  {
				    		  $scope.task.campaign = $scope.taskRelatedToSelected;
				    		  
				    	  }
				    	  else if($scope.task.relatedTo == 'Contact')
				    	  {
				    		  $scope.task.contact = $scope.taskRelatedToSelected;
				    			
				    	  }
				    	  else if($scope.task.relatedTo == 'Lead')
				    	  {
				    		  $scope.task.lead = $scope.taskRelatedToSelected;
				    		  
				    	  }
				    	  else if($scope.task.relatedTo == 'Opportunity')
				    	  {
				    		  $scope.task.opportunity = $scope.taskRelatedToSelected;
					    		
				    	  }
				    	  
				      }, function () {
				    	  				    	  				    	  
				          $log.info('Modal dismissed at: ' + new Date());
				          $log.info('contact: ' +  $scope.taskRelatedToSelected.name);
				      });
				    };
				    
				    $scope.OpenCourse = function(courseId) {
				        $window.alert("Called " + courseId);
				    }
				    
				    $scope.save = function() {
				    	if($scope.task.startDate)
				    		$scope.task.startDate = $filter('date')($scope.task.startDate, 'yyyy-MM-ddTHH:mm:ssZ').toString();
				    	if($scope.task.dueDate)			    	
				    		$scope.task.dueDate = $filter('date')($scope.task.dueDate, 'yyyy-MM-ddTHH:mm:ssZ').toString();
						
				    	$scope.task.$save(function(task, headers) {
							$log.info('[TaskCreateController::save]Task Save success: ' + angular.toJson(task));																	
							AlertService.add('success', 'Create Task Success');
							$location.path('task/view/' + task.id);
						}, function(response) {
							$log.info('[TaskCreateController::save]Task Save failed: ' + angular.toJson(response));
							if(response.data.errors)
							{
								$log.info('domain errors: ' + angular.toJson(response.data.errors));							
							}
							else
							{
								AlertService.add('warning', 'Create Task Failed');
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
