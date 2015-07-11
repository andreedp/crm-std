define(['app'], function (app) {
    'use strict';
    
    app.config(['$routeProvider', function ($routeProvider) {
    	$routeProvider.
	      when('/contact', {
	        templateUrl: 'app/view/contact/contact.html',
	        controller: 'contactController'
	      }).
	      when('/contact/list', {
	        templateUrl: 'app/view/contact/list.html',
	        controller: 'contactListController'
	      }).
	      when('/contact/edit/:contactId', {
	    	  resolve: {
        		  contact: ["ContactLoader", function(ContactLoader) {
                    return ContactLoader();
                  }],
              },
		        templateUrl: 'app/view/contact/form.html',
		        controller: 'contactEditController'
		      }).
	      when('/contact/view/:contactId', {
		    	  resolve: {
	        		  contact: ["ContactLoader", function(ContactLoader) {
	                    return ContactLoader();
	                  }],
	              },
		        templateUrl: 'app/view/contact/view.html',
		        controller: 'contactViewController'
		      }).
	      when('/contact/create', {
		        templateUrl: 'app/view/contact/form.html',
		        controller: 'contactCreateController'
		      }).
		  
	      when('/leads/list', {
	          templateUrl: 'app/view/leads/list.html',
	          controller: 'contactListController'
	        }).
	      when('/', {
	          templateUrl: 'app/view/dashboard.html',
	          controller: 'dashboardController'
	        }).
	      otherwise({
	        redirectTo: '/'
	      });
    }]);
});