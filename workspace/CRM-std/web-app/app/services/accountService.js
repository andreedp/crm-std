define(['services/services'],
		function(services) {
	services.factory('Account', ['$resource', '$cacheFactory',
	                                 function($resource, $cacheFactory) {
		return $resource('/CRM-std/account/:id',{}, {
			  'query': {method:'GET',  isArray:true},
			  //'queryAll':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.account')},
			  'queryAll':  {method:'GET', isArray:true},
			  'update': {method: 'PUT'},
		      'delete': {method:'DELETE', url: '/CRM-std/account/:id', params: {id: '@id'}},
		      'queryTask':  {method:'GET', isArray:true, url: '/CRM-std/account/listTask/:id', params: {id: '@id'},},
				
		});
	}]);
	
	services.factory('AccountLoader', ['Account', '$route', '$q', '$log', 'AlertService', '$location',
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

	services.factory('MultiAccountLoader', ['Account', '$q', '$log', 'AlertService', '$location',
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
	
	services.factory('MultiAccountTaskLoader', ['Account', '$route', '$q', '$log', 'AlertService', '$location',
                                            function(Account, $route, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			Account.queryTask({id: $route.current.params.accountId},function(tasks) {
				delay.resolve(tasks);
			}, function() {
				delay.reject('Unable to fetch tasks');
				$log.error('[MultiAccountTaskLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
			});
			return delay.promise;
		};
	}]);
	
	services.factory('AccountService', ['$http', '$log', 'Account', 
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