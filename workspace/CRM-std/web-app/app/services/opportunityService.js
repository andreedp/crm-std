define(['services/services'],
		function(services) {
	services.factory('Opportunity', ['$resource', '$cacheFactory',
	                                 function($resource, $cacheFactory) {
		return $resource('/CRM-std/opportunity/:id',{}, {
			  'query': {method:'GET',  isArray:true},
			  'queryAll':  {method:'GET', isArray:true},
		      'update': {method: 'PUT'},
		      'delete': {method:'DELETE', url: '/CRM-std/opportunity/:id', params: {id: '@id'}},			
		});
	}]);
	
	services.factory('OpportunityLoader', ['Opportunity', '$route', '$q', '$log', 'AlertService', '$location',
                                       function(Opportunity, $route, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			Opportunity.get({id: $route.current.params.opportunityId}, function(opportunity) {
				delay.resolve(opportunity);
			}, function(error) {
				delay.reject('Unable to fetch opportunity '  + $route.current.params.opportunityId);
				$log.error('[OpportunityLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
				$location.path('#');
			});
			return delay.promise;
		};
	}]);

	services.factory('MultiOpportunityLoader', ['Opportunity', '$q', '$log', 'AlertService', '$location',
                                            function(Opportunity, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			Opportunity.queryAll(function(opportunities) {
				delay.resolve(opportunities);
			}, function() {
				delay.reject('Unable to fetch opportunities');
				$log.error('[MultiOpportunityLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
			});
			return delay.promise;
		};
	}]);
	
	services.factory('OpportunityService', ['$http', '$log', 'Opportunity', 
		                                        function($http, $log, Opportunity) {
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