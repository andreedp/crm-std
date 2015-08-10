define(['services/services'],
		function(services) {
	services.factory('Campaign', ['$resource', '$cacheFactory',
	                                 function($resource, $cacheFactory) {
		return $resource('/CRM-std/campaign/:id',{}, {
			  'query': {method:'GET',  isArray:true},
			  'queryAll':  {method:'GET', isArray:true},
		      'update': {method: 'PUT'},
		      'delete': {method:'DELETE', url: '/CRM-std/campaign/:id', params: {id: '@id'}},	
		      'queryTask':  {method:'GET', isArray:true, url: '/CRM-std/campaign/listTask/:id', params: {id: '@id'},},
				
		});
	}]);
	
	services.factory('CampaignLoader', ['Campaign', '$route', '$q', '$log', 'AlertService', '$location',
                                       function(Campaign, $route, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			Campaign.get({id: $route.current.params.campaignId}, function(campaign) {
				delay.resolve(campaign);
			}, function(error) {
				delay.reject('Unable to fetch campaign '  + $route.current.params.campaignId);
				$log.error('[CampaignLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
				$location.path('#');
			});
			return delay.promise;
		};
	}]);

	services.factory('MultiCampaignLoader', ['Campaign', '$q', '$log', 'AlertService', '$location',
                                            function(Campaign, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			Campaign.queryAll(function(campaign) {
				delay.resolve(campaign);
			}, function() {
				delay.reject('Unable to fetch campaign');
				$log.error('[MultiCampaignLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
			});
			return delay.promise;
		};
	}]);
	
	services.factory('MultiCampaignTaskLoader', ['Campaign', '$route', '$q', '$log', 'AlertService', '$location',
	                                            function(Campaign, $route, $q, $log, AlertService, $location) {
			return function() {
				var delay = $q.defer();
				Campaign.queryTask({id: $route.current.params.campaignId},function(tasks) {
					delay.resolve(tasks);
				}, function() {
					delay.reject('Unable to fetch tasks');
					$log.error('[MultiCampaignTaskLoader]error: ' + angular.toJson(error));
					AlertService.add('danger', error.data);
				});
				return delay.promise;
			};
		}]);
	
	services.factory('CampaignService', ['$http', '$log', 'Campaign', 
		                                        function($http, $log, Campaign) {
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