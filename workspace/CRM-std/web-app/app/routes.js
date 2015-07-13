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
		  when('/contact/create/:leadId', {
		    	  resolve: {
	        		  lead: ["LeadLoader", function(LeadLoader) {
	                    return LeadLoader();
	                  }],
	              },
		        templateUrl: 'app/view/contact/form.html',
		        controller: 'contactCreateController'
		  }).
	      when('/contact/create', {
		        templateUrl: 'app/view/contact/form.html',
		        controller: 'contactCreateController'
		      }).
		  
	      when('/lead/list', {
	          templateUrl: 'app/view/lead/list.html',
	          controller: 'leadListController'
	        }).
	      when('/', {
	    	  resolve: {
	       		  leads: ["MultiLeadLoader", function(MultiLeadLoader) {
	                   return MultiLeadLoader();
	                 }],
	              contacts: ["MultiContactLoader", function(MultiContactLoader) {
		               return MultiContactLoader();
		             }],
	          },
	          templateUrl: 'app/view/dashboard.html',
	          controller: 'dashboardController'
	        }).
	      when('/lead/edit/:leadId', {
		   	  resolve: {
	       		  lead: ["LeadLoader", function(LeadLoader) {
	                   return LeadLoader();
	                 }],
	          },
			  templateUrl: 'app/view/lead/form.html',
			  controller: 'leadEditController'
			}).
		   when('/lead/view/:leadId', {
			   resolve: {
		        		  lead: ["LeadLoader", function(LeadLoader) {
		                    return LeadLoader();
		                  }],
		       },
			   templateUrl: 'app/view/lead/view.html',
			   controller: 'leadViewController'
			}).
		   when('/lead/create', {
			        templateUrl: 'app/view/lead/form.html',
			        controller: 'leadCreateController'
			      }).
	      otherwise({
	        redirectTo: '/'
	      });
    }]);
});