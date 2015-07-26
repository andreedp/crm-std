define(['services/services'],
		function(services) {
	services.factory('ListOfValues', ['$resource', '$cacheFactory',
	                                 function($resource, $cacheFactory) {
		return $resource('/CRM-std/listofvalues/:id',{}, {
			  'query': {method:'GET',  isArray:true},
			  'queryAll':  {method:'GET', isArray:true},
			  'update': {method: 'PUT'},
		      'delete': {method:'DELETE', url: '/CRM-std/listofvalues/:id', params: {id: '@id'}},	
		      'queryIndustry':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.industry'), url: '/CRM-std/listofvalues/listIndustry'},				
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