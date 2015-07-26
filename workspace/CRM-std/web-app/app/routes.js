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
	                  account: ["MultiAccountLoader", function(MultiAccountLoader) {
		                    return MultiAccountLoader();
		              }],
	              },
		        templateUrl: 'app/view/contact/form.html',
		        controller: 'contactCreateController'
		  }).
	      when('/contact/create', {
		    	  resolve: {
	        		  lead: function(){ return []; },
	        		  account: ["MultiAccountLoader", function(MultiAccountLoader) {
		                    return MultiAccountLoader();
		               }],
	              },
		        templateUrl: 'app/view/contact/form.html',
		        controller: 'contactCreateController'
		      }).
	      when('/account/list', {
		        templateUrl: 'app/view/account/list.html',
		        controller: 'accountListController'
		      }).
	      when('/account/edit/:accountId', {
	    	  resolve: {
	    		  account: ["AccountLoader", function(AccountLoader) {
                    return AccountLoader();
                  }],
              },
		        templateUrl: 'app/view/account/form.html',
		        controller: 'accountEditController'
		      }).
	      when('/account/view/:accountId', {
		    	  resolve: {
		    		  account: ["AccountLoader", function(AccountLoader) {
	                    return AccountLoader();
	                  }],
	              },
		        templateUrl: 'app/view/account/view.html',
		        controller: 'accountViewController'
		      }).
	      when('/account/create', {
	    	  resolve: {
	    		  industry: ["MultiIndustryLoader", function(MultiIndustryLoader) {
                    return MultiIndustryLoader();
                  }],
              },
		        templateUrl: 'app/view/account/form.html',
		        controller: 'accountCreateController'
		      }).
	      when('/opportunity/list', {
		        templateUrl: 'app/view/opportunity/list.html',
		        controller: 'opportunityListController'
		      }).
	      when('/opportunity/edit/:opportunityId', {
		    	  resolve: {
		    		  opportunity: ["OpportunityLoader", function(OpportunityLoader) {
	                    return OpportunityLoader();
	                  	  }],
	                  account: ["MultiAccountLoader", function(MultiAccountLoader) {
		                    return MultiAccountLoader();
		                  }],
	              },
		        templateUrl: 'app/view/opportunity/form.html',
		        controller: 'opportunityEditController'
		      }).
	      when('/opportunity/view/:opportunityId', {
		    	  resolve: {
		    		  opportunity: ["OpportunityLoader", function(OpportunityLoader) {
	                    return OpportunityLoader();
	                  }],
	              },
		        templateUrl: 'app/view/opportunity/view.html',
		        controller: 'opportunityViewController'
		      }).
		  when('/opportunity/create/:leadId', {
		    	  resolve: {
	        		  lead: ["LeadLoader", function(LeadLoader) {
	                    return LeadLoader();
	                  }],
	              },
		        templateUrl: 'app/view/opportunity/form.html',
		        controller: 'opportunityCreateController'
		  }).
		  when('/opportunity/create', {
				  resolve: {
	        		  account: ["MultiAccountLoader", function(MultiAccountLoader) {
	                    return MultiAccountLoader();
	                  }],
	              },
		        templateUrl: 'app/view/opportunity/form.html',
		        controller: 'opportunityCreateController'
		      }).
	      when('/lead/list', {
	          templateUrl: 'app/view/lead/list.html',
	          controller: 'leadListController'
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
	      when('/campaign/list', {
	          templateUrl: 'app/view/campaign/list.html',
	          controller: 'campaignListController'
	        }).	      
	      when('/campaign/edit/:campaignId', {
		   	  resolve: {
		   		campaign: ["CampaignLoader", function(CampaignLoader) {
	                   return CampaignLoader();
	                 }],
	          },
			  templateUrl: 'app/view/campaign/form.html',
			  controller: 'campaignEditController'
			}).
		   when('/campaign/view/:leadId', {
			   resolve: {
				   campaign: ["CampaignLoader", function(CampaignLoader) {
		                    return CampaignLoader();
		                  }],
		       },
			   templateUrl: 'app/view/campaign/view.html',
			   controller: 'campaignViewController'
			}).
		   when('/campaign/create', {
			        templateUrl: 'app/view/campaign/form.html',
			        controller: 'campaignCreateController'
	       }).
	       when('/', {
	    	  resolve: {
	       		  leads: ["MultiLeadLoader", function(MultiLeadLoader) {
	                   return MultiLeadLoader();
	                 }],
	              contacts: ["MultiContactLoader", function(MultiContactLoader) {
		               return MultiContactLoader();
		             }],
	             opportunity: ["MultiOpportunityLoader", function(MultiOpportunityLoader) {
		               return MultiOpportunityLoader();
		             }],
	          },
	          templateUrl: 'app/view/dashboard.html',
	          controller: 'dashboardController'
	        }).
	      otherwise({
	        redirectTo: '/'
	      });
    }]);
});