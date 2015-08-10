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
	    		  account: ["MultiAccountLoader", function(MultiAccountLoader) {
	                    return MultiAccountLoader();
	              }],
        		  contact: ["ContactLoader", function(ContactLoader) {
                    return ContactLoader();
                  }],
                  titles: ["MultiTitleLoader", function(MultiTitleLoader) {
	                    return MultiTitleLoader();
	               }],
	               sex: ["MultiSexLoader", function(MultiSexLoader) {
	                    return MultiSexLoader();
	               }],
	               leadSource: ["MultiLeadSourceLoader", function(MultiLeadSourceLoader) {
	                    return MultiLeadSourceLoader();
	               }],
	               users: ["MultiUserLoader", function(MultiUserLoader) {
	                    return MultiUserLoader();
	               }],
                 campaign: ["MultiCampaignLoader", function(MultiCampaignLoader) {
	                    return MultiCampaignLoader();
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
	                  task: ["MultiContactTaskLoader", function(MultiContactTaskLoader) {
		                    return MultiContactTaskLoader();
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
		              titles: ["MultiTitleLoader", function(MultiTitleLoader) {
		                    return MultiTitleLoader();
		               }],
		               sex: ["MultiSexLoader", function(MultiSexLoader) {
		                    return MultiSexLoader();
		               }],
		               leadSource: ["MultiLeadSourceLoader", function(MultiLeadSourceLoader) {
		                    return MultiLeadSourceLoader();
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
		               titles: ["MultiTitleLoader", function(MultiTitleLoader) {
		                    return MultiTitleLoader();
		               }],
		               sex: ["MultiSexLoader", function(MultiSexLoader) {
		                    return MultiSexLoader();
		               }],
		               leadSource: ["MultiLeadSourceLoader", function(MultiLeadSourceLoader) {
		                    return MultiLeadSourceLoader();
		               }],
		               users: ["MultiUserLoader", function(MultiUserLoader) {
		                    return MultiUserLoader();
	                  }],
	                  campaign: ["MultiCampaignLoader", function(MultiCampaignLoader) {
		                    return MultiCampaignLoader();
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
                  	industry: ["MultiIndustryLoader", function(MultiIndustryLoader) {
                      return MultiIndustryLoader();
                    }],
                    types: ["MultiAccountTypeLoader", function(MultiAccountTypeLoader) {
                        return MultiAccountTypeLoader();
                      }],
                    company: ["MultiCompanyLoader", function(MultiCompanyLoader) {
                      return MultiCompanyLoader();
                    }],
                    users: ["MultiUserLoader", function(MultiUserLoader) {
	                    return MultiUserLoader();
	                }],
	                campaign: ["MultiCampaignLoader", function(MultiCampaignLoader) {
	                    return MultiCampaignLoader();
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
	                  task: ["MultiAccountTaskLoader", function(MultiAccountTaskLoader) {
		                    return MultiAccountTaskLoader();
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
                  types: ["MultiAccountTypeLoader", function(MultiAccountTypeLoader) {
                      return MultiAccountTypeLoader();
                    }],
                  company: ["MultiCompanyLoader", function(MultiCompanyLoader) {
                    return MultiCompanyLoader();
                  }],  
                  users: ["MultiUserLoader", function(MultiUserLoader) {
	                    return MultiUserLoader();
	               }],
	               campaign: ["MultiCampaignLoader", function(MultiCampaignLoader) {
	                    return MultiCampaignLoader();
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
	                  salesStage: ["MultiSalesStageLoader", function(MultiSalesStageLoader) {
		                    return MultiSalesStageLoader();
	                  }],
	                  leadSource: ["MultiLeadSourceLoader", function(MultiLeadSourceLoader) {
		                    return MultiLeadSourceLoader();
	                  }],
	                  users: ["MultiUserLoader", function(MultiUserLoader) {
		                    return MultiUserLoader();
		               }],
		               type: ["MultiOpportunityTypeLoader", function(MultiOpportunityTypeLoader) {
		                    return MultiOpportunityTypeLoader();
		               }],
		               campaign: ["MultiCampaignLoader", function(MultiCampaignLoader) {
		                    return MultiCampaignLoader();
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
	                  task: ["MultiOpportunityTaskLoader", function(MultiOpportunityTaskLoader) {
		                    return MultiOpportunityTaskLoader();
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
	                  account: ["MultiAccountLoader", function(MultiAccountLoader) {
		                    return MultiAccountLoader();
		                  }],
	                  leadSource: ["MultiLeadSourceLoader", function(MultiLeadSourceLoader) {
		                    return MultiLeadSourceLoader();
	                  }],
	                  salesStage: ["MultiSalesStageLoader", function(MultiSalesStageLoader) {
		                    return MultiSalesStageLoader();
	                  }],
	                  users: ["MultiUserLoader", function(MultiUserLoader) {
		                    return MultiUserLoader();
		               }],
		               type: ["MultiOpportunityTypeLoader", function(MultiOpportunityTypeLoader) {
		                    return MultiOpportunityTypeLoader();
		               }],
		               campaign: ["MultiCampaignLoader", function(MultiCampaignLoader) {
		                    return MultiCampaignLoader();
	                  }],
	              },
		        templateUrl: 'app/view/opportunity/form.html',
		        controller: 'opportunityCreateController'
		  }).
		  when('/opportunity/create', {
				  resolve: {
					  lead: function(){ return []; },
	        		  account: ["MultiAccountLoader", function(MultiAccountLoader) {
	                    return MultiAccountLoader();
	                  }],
	                  leadSource: ["MultiLeadSourceLoader", function(MultiLeadSourceLoader) {
		                    return MultiLeadSourceLoader();
	                  }],
	                  salesStage: ["MultiSalesStageLoader", function(MultiSalesStageLoader) {
		                    return MultiSalesStageLoader();
	                  }],
	                  users: ["MultiUserLoader", function(MultiUserLoader) {
		                    return MultiUserLoader();
		               }],
		               type: ["MultiOpportunityTypeLoader", function(MultiOpportunityTypeLoader) {
		                    return MultiOpportunityTypeLoader();
		               }],
		               campaign: ["MultiCampaignLoader", function(MultiCampaignLoader) {
		                    return MultiCampaignLoader();
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
                 titles: ["MultiTitleLoader", function(MultiTitleLoader) {
	                    return MultiTitleLoader();
                  }],
                  sex: ["MultiSexLoader", function(MultiSexLoader) {
	                    return MultiSexLoader();
                  }],
                  leadSource: ["MultiLeadSourceLoader", function(MultiLeadSourceLoader) {
	                    return MultiLeadSourceLoader();
                  }],
                  leadStatus: ["MultiLeadStatusLoader", function(MultiLeadStatusLoader) {
	                    return MultiLeadStatusLoader();
                  }],
                  users: ["MultiUserLoader", function(MultiUserLoader) {
	                    return MultiUserLoader();
                  }],
                  campaign: ["MultiCampaignLoader", function(MultiCampaignLoader) {
	                    return MultiCampaignLoader();
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
		                  task: ["MultiLeadTaskLoader", function(MultiLeadTaskLoader) {
			                    return MultiLeadTaskLoader();
		                  }],
		       },
			   templateUrl: 'app/view/lead/view.html',
			   controller: 'leadViewController'
			}).
		   when('/lead/create', {
				   resolve: {
		        		  leadStatus: ["MultiLeadStatusLoader", function(MultiLeadStatusLoader) {
		                    return MultiLeadStatusLoader();
		                  }],
		                  titles: ["MultiTitleLoader", function(MultiTitleLoader) {
			                    return MultiTitleLoader();
		                  }],
		                  sex: ["MultiSexLoader", function(MultiSexLoader) {
			                    return MultiSexLoader();
		                  }],
		                  leadSource: ["MultiLeadSourceLoader", function(MultiLeadSourceLoader) {
			                    return MultiLeadSourceLoader();
		                  }],
		                  users: ["MultiUserLoader", function(MultiUserLoader) {
			                    return MultiUserLoader();
		                  }],
		                  campaign: ["MultiCampaignLoader", function(MultiCampaignLoader) {
			                    return MultiCampaignLoader();
		                  }],
				   },
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
                 campaignStatus: ["MultiCampaignStatusLoader", function(MultiCampaignStatusLoader) {
	                   return MultiCampaignStatusLoader();
	                 }],
                 campaignType: ["MultiCampaignTypeLoader", function(MultiCampaignTypeLoader) {
                   return MultiCampaignTypeLoader();
                 }],
                 users: ["MultiUserLoader", function(MultiUserLoader) {
	                    return MultiUserLoader();
                }],
	          },
			  templateUrl: 'app/view/campaign/form.html',
			  controller: 'campaignEditController'
			}).
		   when('/campaign/view/:campaignId', {
			   resolve: {
				   campaign: ["CampaignLoader", function(CampaignLoader) {
		                    return CampaignLoader();
                  }],
                  task: ["MultiCampaignTaskLoader", function(MultiCampaignTaskLoader) {
	                    return MultiCampaignTaskLoader();
                  }],
		       },
			   templateUrl: 'app/view/campaign/view.html',
			   controller: 'campaignViewController'
			}).
		   when('/campaign/create', {
			   resolve: {
				   campaignStatus: ["MultiCampaignStatusLoader", function(MultiCampaignStatusLoader) {
		                   return MultiCampaignStatusLoader();
		                 }],
	                campaignType: ["MultiCampaignTypeLoader", function(MultiCampaignTypeLoader) {
	                   return MultiCampaignTypeLoader();
	                 }],
	                users: ["MultiUserLoader", function(MultiUserLoader) {
		                    return MultiUserLoader();
	                }],
		          },
			        templateUrl: 'app/view/campaign/form.html',
			        controller: 'campaignCreateController'
	       }).
	       when('/task/list', {
		          templateUrl: 'app/view/task/list.html',
		          controller: 'taskListController'
		        }).	      
	      when('/task/edit/:taskId', {
		   	  resolve: {
		   		task: ["TaskLoader", function(TaskLoader) {
	                   return TaskLoader();
	                 }],
                 leads: ["MultiLeadLoader", function(MultiLeadLoader) {
	                   return MultiLeadLoader();
	                 }],
                 campaign: ["MultiCampaignLoader", function(MultiCampaignLoader) {
	                    return MultiCampaignLoader();
	                  }],
                  users: ["MultiUserLoader", function(MultiUserLoader) {
	                    return MultiUserLoader();
	                  }],
				   relatedTo: ["MultiTaskOwnerLoader", function(MultiTaskOwnerLoader) {
		                   return MultiTaskOwnerLoader();
		                 }],
                  taskStatus: ["MultiTaskStatusLoader", function(MultiTaskStatusLoader) {
	                   return MultiTaskStatusLoader();
	                 }],
                  contact: ["MultiContactLoader", function(MultiContactLoader) {
	                   return MultiContactLoader();
	                 }],
                 account: ["MultiAccountLoader", function(MultiAccountLoader) {
	                    return MultiAccountLoader();
	              }],
	              opportunity: ["MultiOpportunityLoader", function(MultiOpportunityLoader) {
		               return MultiOpportunityLoader();
		             }],
	          },
			  templateUrl: 'app/view/task/form.html',
			  controller: 'taskEditController'
			}).
		   when('/task/view/:taskId', {
			   resolve: {
				   task: ["TaskLoader", function(TaskLoader) {
		                    return TaskLoader();
                  }],
		       },
			   templateUrl: 'app/view/task/view.html',
			   controller: 'taskViewController'
			}).
		   when('/task/create', {
			   resolve: {
				   leads: ["MultiLeadLoader", function(MultiLeadLoader) {
	                   return MultiLeadLoader();
	                 }],
                 campaign: ["MultiCampaignLoader", function(MultiCampaignLoader) {
	                    return MultiCampaignLoader();
	                  }],
                  users: ["MultiUserLoader", function(MultiUserLoader) {
	                    return MultiUserLoader();
	                  }],
				   relatedTo: ["MultiTaskOwnerLoader", function(MultiTaskOwnerLoader) {
		                   return MultiTaskOwnerLoader();
		                 }],
                  taskStatus: ["MultiTaskStatusLoader", function(MultiTaskStatusLoader) {
	                   return MultiTaskStatusLoader();
	                 }],
                  contact: ["MultiContactLoader", function(MultiContactLoader) {
	                   return MultiContactLoader();
	                 }],
                 account: ["MultiAccountLoader", function(MultiAccountLoader) {
	                    return MultiAccountLoader();
	              }],
	              opportunity: ["MultiOpportunityLoader", function(MultiOpportunityLoader) {
		               return MultiOpportunityLoader();
		             }],
	             priority: ["MultiPriorityLoader", function(MultiPriorityLoader) {
	                   return MultiPriorityLoader();
	                 }],
		          },		          
			        templateUrl: 'app/view/task/form.html',
			        controller: 'taskCreateController'
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
	             task: ["MultiTaskLoader", function(MultiTaskLoader) {
	                    return MultiTaskLoader();
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