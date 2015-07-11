define(['services/services'],
		function(services) {
	services.factory('Contact', ['$resource', 
	                                 function($resource) {
		return $resource('/CRM-std/contact/:id',{}, {
			'query': {method:'GET',  isArray:true},
		      'update': {method: 'PUT'},
		      'delete': {method:'DELETE', url: '/CRM-std/contact/:id', params: {id: '@id'}},			
		});
	}]);
	
	services.factory('ContactLoader', ['Contact', '$route', '$q', '$log', 'AlertService', '$location',
                                       function(Contact, $route, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			Contact.get({id: $route.current.params.contactId}, function(contact) {
				delay.resolve(contact);
			}, function(error) {
				delay.reject('Unable to fetch contact '  + $route.current.params.contactId);
				$log.error('[ContactLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
				$location.path('#');
			});
			return delay.promise;
		};
	}]);
	
	services.factory('ContactService', ['$http', '$log', 'Contact', 
		                                        function($http, $log, Contact) {
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