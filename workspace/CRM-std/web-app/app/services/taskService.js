define(['services/services'],
		function(services) {
	services.factory('Task', ['$resource', '$cacheFactory',
	                                 function($resource, $cacheFactory) {
		return $resource('/CRM-std/task/:id',{}, {
			  'query': {method:'GET',  isArray:true},
			  'queryAll':  {method:'GET', isArray:true},
		      'update': {method: 'PUT'},
		      'delete': {method:'DELETE', url: '/CRM-std/task/:id', params: {id: '@id'}},	
		      
		});
	}]);
	
	services.factory('TaskLoader', ['Task', '$route', '$q', '$log', 'AlertService', '$location',
                                       function(Task, $route, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			Task.get({id: $route.current.params.taskId}, function(task) {
				delay.resolve(task);
			}, function(error) {
				delay.reject('Unable to fetch task '  + $route.current.params.taskId);
				$log.error('[TaskLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
				$location.path('#');
			});
			return delay.promise;
		};
	}]);

	services.factory('MultiTaskLoader', ['Task', '$q', '$log', 'AlertService', '$location',
                                            function(Task, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			Task.queryAll(function(opportunities) {
				delay.resolve(opportunities);
			}, function() {
				delay.reject('Unable to fetch opportunities');
				$log.error('[MultiTaskLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
			});
			return delay.promise;
		};
	}]);
	
	services.factory('TaskService', ['$http', '$log', 'Task', 
		                                        function($http, $log, Task) {
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