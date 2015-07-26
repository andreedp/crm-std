define(['services/services'],
		function(services) {
	services.factory('Lead', ['$resource', '$cacheFactory',
	                                 function($resource, $cacheFactory) {
		return $resource('/CRM-std/lead/:id',{}, {
			  'query': {method:'GET',  isArray:true},
			  'queryAll':  {method:'GET', isArray:true},
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
			Lead.queryAll({ max: 0 }, function(leads) {
				delay.resolve(leads);
			}, function(error) {
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
			
			service.calculateRating = function(lead){
				
				if(!lead)
				{
					return;
				}
				var total = 0;
				
				if(lead.name)
				{
					total = total + 5
				}
				else if(lead.address)
				{
					total = total + 5
				}
				else if(lead.email)
				{
					total = total + 5
				}
				else if(lead.department)
				{
					total = total + 5
				}
				else if(lead.company)
				{
					total = total + 5
				}
				else if(lead.socialMedia)
				{
					total = total + 5
				}
				else if(lead.nextStep)
				{
					total = total + 5
				}
				else if(lead.budget)
				{
					total = total + 5
				}
				
				if(total >= 5)
				{
					lead.rating = 2
				}
				else if(total >= 10)
				{
					lead.rating = 3
				}
				else if(total >= 15)
				{
					lead.rating = 4
				}
				else if(total >= 20)
				{
					lead.rating = 5
				}
				else if(total >= 25)
				{
					lead.rating = 6
				}
				else if(total >= 30)
				{
					lead.rating = 7
				}
				else if(total < 35)
				{
					lead.rating = 8
				}
				
				$log.info('[LeadService::calculateRating]Rating: ' + lead.rating);
				
				return lead;
			};
			
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