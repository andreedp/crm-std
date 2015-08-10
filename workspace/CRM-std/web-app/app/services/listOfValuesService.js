define(['services/services'],
		function(services) {
	services.factory('ListOfValues', ['$resource', '$cacheFactory',
	                                 function($resource, $cacheFactory) {
		return $resource('/CRM-std/listofvalues/:id',{}, {
			  'query': {method:'GET',  isArray:true},
			  'queryAll':  {method:'GET', isArray:true},
			  'update': {method: 'PUT'},
		      'delete': {method:'DELETE', url: '/CRM-std/listofvalues/:id', params: {id: '@id'}},	
		      'queryIndustry':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.industry'), url: '/CRM-std/listOfValues/listIndustry'},
		      'queryCompany':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.company'), url: '/CRM-std/listOfValues/listCompany'},
		      'querySex':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.sex'), url: '/CRM-std/listOfValues/listSex'},
		      'queryTitle':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.title'), url: '/CRM-std/listOfValues/listTitle'},
		      'querySalesStage':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.salesStage'), url: '/CRM-std/listOfValues/listSalesStage'},
		      'queryLeadSource':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.leadSource'), url: '/CRM-std/listOfValues/listLeadSource'},
		      'queryTaskOwner':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.taskOwner'), url: '/CRM-std/listOfValues/listTaskOwner'},
		      'queryCampaignStatus':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.campaignStatus'), url: '/CRM-std/listOfValues/listCampaignStatus'},
		      'queryCampaignType':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.campaignType'), url: '/CRM-std/listOfValues/listCampaignType'},
		      'queryAccountType':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.accountType'), url: '/CRM-std/listOfValues/listAccountType'},
		      'queryLeadStatus':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.leadStatus'), url: '/CRM-std/listOfValues/listLeadStatus'},
		      'queryTaskStatus':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.taskStatus'), url: '/CRM-std/listOfValues/listTaskStatus'},
		      'queryPriority':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.priority'), url: '/CRM-std/listOfValues/listPriority'},
		      'queryOpportunityType':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.opportunityType'), url: '/CRM-std/listOfValues/listOpportunityType'},
					
		});
	}]);
	
	services.factory('ListOfValuesLoader', ['Account', '$route', '$q', '$log', 'AlertService', '$location',
                                       function(Account, $route, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			Account.get({id: $route.current.params.accountId}, function(account) {
				delay.resolve(account);
			}, function(error) {
				delay.reject('Unable to fetch account '  + $route.current.params.accountId);
				$log.error('[AccountLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
				$location.path('#');
			});
			return delay.promise;
		};
	}]);

	services.factory('MultiListOfValuesLoader', ['Account', '$q', '$log', 'AlertService', '$location',
                                            function(Account, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			Account.queryAll(function(accounts) {
				delay.resolve(accounts);
			}, function() {
				delay.reject('Unable to fetch accounts');
				$log.error('[MultiAccountLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
			});
			return delay.promise;
		};
	}]);
	
	services.factory('MultiIndustryLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
		function(ListOfValues, $q, $log, AlertService, $location) {
			return function() {
				var delay = $q.defer();
				ListOfValues.queryIndustry({ max: 0 }, function(industry) {
					delay.resolve(industry);
				}, function() {
					delay.reject('Unable to fetch industry');
					$log.error('[MultiIndustryLoader]error: ' + angular.toJson(error));
					AlertService.add('danger', error.data);
				});
				return delay.promise;
			};
		}]);
	
	services.factory('MultiSexLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
 		function(ListOfValues, $q, $log, AlertService, $location) {
 			return function() {
 				var delay = $q.defer();
 				ListOfValues.querySex({ max: 0 }, function(sex) {
 					delay.resolve(sex);
 				}, function() {
 					delay.reject('Unable to fetch sex');
 					$log.error('[MultiSexLoader]error: ' + angular.toJson(error));
 					AlertService.add('danger', error.data);
 				});
 				return delay.promise;
 			};
 		}]);
	
	services.factory('MultiTitleLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
 		function(ListOfValues, $q, $log, AlertService, $location) {
 			return function() {
 				var delay = $q.defer();
 				ListOfValues.queryTitle({ max: 0 }, function(title) {
 					delay.resolve(title);
 				}, function() {
 					delay.reject('Unable to fetch title');
 					$log.error('[MultiTitleLoader]error: ' + angular.toJson(error));
 					AlertService.add('danger', error.data);
 				});
 				return delay.promise;
 			};
 		}]);
	
	services.factory('MultiCompanyLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
   		function(ListOfValues, $q, $log, AlertService, $location) {
   			return function() {
   				var delay = $q.defer();
   				ListOfValues.queryCompany({ max: 0 }, function(company) {
   					delay.resolve(company);
   				}, function() {
   					delay.reject('Unable to fetch company');
   					$log.error('[MultiCompanyLoader]error: ' + angular.toJson(error));
   					AlertService.add('danger', error.data);
   				});
   				return delay.promise;
   			};
   		}]);
	
	services.factory('MultiLeadSourceLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
   		function(ListOfValues, $q, $log, AlertService, $location) {
   			return function() {
   				var delay = $q.defer();
   				ListOfValues.queryLeadSource({ max: 0 }, function(leadSource) {
   					delay.resolve(leadSource);
   				}, function() {
   					delay.reject('Unable to fetch leadSource');
   					$log.error('[MultiLeadSourceLoader]error: ' + angular.toJson(error));
   					AlertService.add('danger', error.data);
   				});
   				return delay.promise;
   			};
   		}]);
	
	services.factory('MultiSalesStageLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
  		function(ListOfValues, $q, $log, AlertService, $location) {
  			return function() {
  				var delay = $q.defer();
  				ListOfValues.querySalesStage({ max: 0 }, function(salesStage) {
  					delay.resolve(salesStage);
  				}, function() {
  					delay.reject('Unable to fetch salesStage');
  					$log.error('[MultiSalesStageLoader]error: ' + angular.toJson(error));
  					AlertService.add('danger', error.data);
  				});
  				return delay.promise;
  			};
  		}]);
	
	services.factory('MultiTaskOwnerLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
 		function(ListOfValues, $q, $log, AlertService, $location) {
 			return function() {
 				var delay = $q.defer();
 				ListOfValues.queryTaskOwner({ max: 0 }, function(taskOwner) {
 					delay.resolve(taskOwner);
 				}, function() {
 					delay.reject('Unable to fetch taskOwner');
 					$log.error('[MultiTaskOwnerLoader]error: ' + angular.toJson(error));
 					AlertService.add('danger', error.data);
 				});
 				return delay.promise;
 			};
 		}]);
	
	services.factory('MultiCampaignStatusLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
   		function(ListOfValues, $q, $log, AlertService, $location) {
   			return function() {
   				var delay = $q.defer();
   				ListOfValues.queryCampaignStatus({ max: 0 }, function(campaignStatus) {
   					delay.resolve(campaignStatus);
   				}, function() {
   					delay.reject('Unable to fetch campaignStatus');
   					$log.error('[MultiCampaignStatusLoader]error: ' + angular.toJson(error));
   					AlertService.add('danger', error.data);
   				});
   				return delay.promise;
   			};
   		}]);
	
	services.factory('MultiCampaignTypeLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
  		function(ListOfValues, $q, $log, AlertService, $location) {
  			return function() {
  				var delay = $q.defer();
  				ListOfValues.queryCampaignType({ max: 0 }, function(campaignType) {
  					delay.resolve(campaignType);
  				}, function() {
  					delay.reject('Unable to fetch campaignType');
  					$log.error('[MultiCampaignTypeLoader]error: ' + angular.toJson(error));
  					AlertService.add('danger', error.data);
  				});
  				return delay.promise;
  			};
  		}]);
	
	services.factory('MultiAccountTypeLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
   		function(ListOfValues, $q, $log, AlertService, $location) {
   			return function() {
   				var delay = $q.defer();
   				ListOfValues.queryAccountType({ max: 0 }, function(accountType) {
   					delay.resolve(accountType);
   				}, function() {
   					delay.reject('Unable to fetch accountType');
   					$log.error('[MultiAccountTypeLoader]error: ' + angular.toJson(error));
   					AlertService.add('danger', error.data);
   				});
   				return delay.promise;
   			};
   		}]);
	
	services.factory('MultiLeadStatusLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
   		function(ListOfValues, $q, $log, AlertService, $location) {
   			return function() {
   				var delay = $q.defer();
   				ListOfValues.queryLeadStatus({ max: 0 }, function(leadStatus) {
   					delay.resolve(leadStatus);
   				}, function() {
   					delay.reject('Unable to fetch leadStatus');
   					$log.error('[MultiLeadStatusLoader]error: ' + angular.toJson(error));
   					AlertService.add('danger', error.data);
   				});
   				return delay.promise;
   			};
   		}])
   		
   	services.factory('MultiTaskStatusLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
   		function(ListOfValues, $q, $log, AlertService, $location) {
   			return function() {
   				var delay = $q.defer();
   				ListOfValues.queryTaskStatus({ max: 0 }, function(taskStatus) {
   					delay.resolve(taskStatus);
   				}, function() {
   					delay.reject('Unable to fetch taskStatus');
   					$log.error('[MultiTaskStatusLoader]error: ' + angular.toJson(error));
   					AlertService.add('danger', error.data);
   				});
   				return delay.promise;
   			};
   		}])
   		
	services.factory('MultiPriorityLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
   		function(ListOfValues, $q, $log, AlertService, $location) {
   			return function() {
   				var delay = $q.defer();
   				ListOfValues.queryPriority({ max: 0 }, function(priority) {
   					delay.resolve(priority);
   				}, function() {
   					delay.reject('Unable to fetch priority');
   					$log.error('[MultiPriorityLoader]error: ' + angular.toJson(error));
   					AlertService.add('danger', error.data);
   				});
   				return delay.promise;
   			};
   		}])
   		
	services.factory('MultiOpportunityTypeLoader', ['ListOfValues', '$q', '$log', 'AlertService', '$location',	                                       
   		function(ListOfValues, $q, $log, AlertService, $location) {
   			return function() {
   				var delay = $q.defer();
   				ListOfValues.queryOpportunityType({ max: 0 }, function(type) {
   					delay.resolve(type);
   				}, function() {
   					delay.reject('Unable to fetch priority');
   					$log.error('[MultiOpportunityTypeLoader]error: ' + angular.toJson(error));
   					AlertService.add('danger', error.data);
   				});
   				return delay.promise;
   			};
   		}])
	
	services.factory('ListOfValuesService', ['$http', '$log', 'Account', 
		                                        function($http, $log, Account) {
			var service = {};
			service.test = function(){
				$log.info('Test');
			}
			
			return service;        	
	}]);
});

/*'use strict';

var contactServices = angular.module('contactServices', ['ngResource']);

contactServices.factory('Contact', ['$resource',
  function($resource){
    return $resource('/CRM-std/contact/:id', {}, {
      'query': {method:'GET',  isArray:true},
      'update': {method: 'PUT'},
      'delete': {method:'DELETE', url: '/CRM-std/contact/:id', params: {id: '@id'}},
    });
  }]);
*/