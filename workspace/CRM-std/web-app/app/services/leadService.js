define(['services/services'],
		function(services) {
	services.factory('Lead', ['$resource', '$cacheFactory',
	                                 function($resource, $cacheFactory) {
		return $resource('/CRM-std/lead/:id',{}, {
			  'query': {method:'GET',  isArray:true},
			  'queryAll':  {method:'GET', isArray:true, cache: $cacheFactory('di.data.lead')},
		      'update': {method: 'PUT'},
		      'delete': {method:'DELETE', url: '/CRM-std/lead/:id', params: {id: '@id'}},			
		});
	}]);
	
	services.factory('LeadLoader', ['Lead', '$route', '$q', '$log', 'AlertService', '$location',
                                       function(Lead, $route, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			Lead.get({id: $route.current.params.leadId}, function(lead) {
				delay.resolve(lead);
			}, function(error) {
				delay.reject('Unable to fetch lead '  + $route.current.params.leadId);
				$log.error('[LeadLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
				$location.path('#');
			});
			return delay.promise;
		};
	}]);

	services.factory('MultiLeadLoader', ['Lead', '$q', '$log', 'AlertService', '$location',
                                            function(Lead, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			Lead.queryAll(function(leads) {
				delay.resolve(leads);
			}, function() {
				delay.reject('Unable to fetch patients');
				$log.error('[MultiContactLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
			});
			return delay.promise;
		};
	}]);
	
	services.factory('LeadService', ['$http', '$log', 'Lead', 
		                                        function($http, $log, Lead) {
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