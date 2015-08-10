define(['services/services'],
  function(services) {
	services.factory('User', ['$resource', 
                                 function($resource) {
	return $resource('/CRM-std/secAppUser/:id',{}, {
		  'query': {method:'GET',  isArray:true},
		  'queryAll': {method:'GET',  isArray:true},
	      'update': {method: 'PUT'},
	      'delete': {method:'DELETE', url: '/CRM-std/secAppUser/:id', params: {id: '@id'}},	
	      'current': {method:'GET', url: '/CRM-std/secAppUser/currentUser'},
		});
	}]);
	
	services.factory('UserLoader', ['User', '$route', '$q', '$log', 'AlertService', '$location',
                                    function(User, $route, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			User.get({id: $route.current.params.userId}, function(user) {
				delay.resolve(user);
			}, function(error) {
				delay.reject('Unable to fetch user '  + $route.current.params.userId);
				$log.error('[UserLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
				$location.path('#');
			});
			return delay.promise;
		};
	}]);

	services.factory('MultiUserLoader', ['User', '$q', '$log', 'AlertService', '$location',
                                         function(User, $q, $log, AlertService, $location) {
		return function() {
			var delay = $q.defer();
			User.queryAll({ max: 0 }, function(users) {
				delay.resolve(users);
			}, function(error) {
				delay.reject('Unable to fetch user');
				$log.error('[MultiUserLoader]error: ' + angular.toJson(error));
				AlertService.add('danger', error.data);
			});
			return delay.promise;
		};
	}]);
	
	services.factory('UserService', ['$http', '$log', 'User', 
		                                        function($http, $log, User) {
			var service = {};
			service.test = function(){
				$log.info('Test');
			}
			
			service.calculateRating = function(user){
				
				if(!user)
				{
					return;
				}
				var total = 0;
				
				if(user.name)
				{
					total = total + 5
				}
				else if(user.address)
				{
					total = total + 5
				}
				else if(user.email)
				{
					total = total + 5
				}
				else if(user.department)
				{
					total = total + 5
				}
				else if(user.company)
				{
					total = total + 5
				}
				else if(user.socialMedia)
				{
					total = total + 5
				}
				else if(user.nextStep)
				{
					total = total + 5
				}
				else if(user.budget)
				{
					total = total + 5
				}
				
				if(total >= 5)
				{
					user.rating = 2
				}
				else if(total >= 10)
				{
					user.rating = 3
				}
				else if(total >= 15)
				{
					user.rating = 4
				}
				else if(total >= 20)
				{
					user.rating = 5
				}
				else if(total >= 25)
				{
					user.rating = 6
				}
				else if(total >= 30)
				{
					user.rating = 7
				}
				else if(total < 35)
				{
					user.rating = 8
				}
				
				$log.info('[UserService::calculateRating]Rating: ' + user.rating);
				
				return user;
			};
			
			return service;        	
	}]);
});