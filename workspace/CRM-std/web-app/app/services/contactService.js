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