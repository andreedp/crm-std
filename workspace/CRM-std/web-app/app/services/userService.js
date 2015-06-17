define(['services/services'],
  function(services) {
	services.factory('User', ['$resource', 
                                 function($resource) {
	return $resource('/CRM-std/secAppUser/:id',{}, {
		  'query': {method:'GET',  isArray:true},
	      'update': {method: 'PUT'},
	      'delete': {method:'DELETE', url: '/CRM-std/secAppUser/:id', params: {id: '@id'}},	
	      'current': {method:'GET', url: '/CRM-std/secAppUser/currentUser'},
		});
	}]);
});