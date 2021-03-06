require.config({
	waitSeconds: 20,
	paths: {
		'jquery': 'vendor/jquery-1.9.1',
		'angular': 'vendor/angular/angular',
		'angularRoute': 'vendor/angular/angular-route',
		'angularResource': 'vendor/angular/angular-resource',
		'angular-moment': 'vendor/angular/angular-moment',
		'angular-ui': 'vendor/ui-bootstrap-tpls-0.9.0',
		'moment': 'vendor/moment.min',
		'domReady': 'vendor/requirejs/domReady',
		'menuBootstrap':'vendor/bootstrap.min',		
		'morrisData':'vendor/morris/morris-data',
		'morris':'vendor/morris/morris',
		'raphael':'vendor/raphael.min',
		'angularGrid': 'vendor/smart-table',
		'dateRangePicker': 'vendor/daterangepicker',
		'angularDateRangePicker': 'vendor/angular/angular-daterangepicker',
		
},
shim: {	
		'jquery': {
			  exports: 'jquery'
		  },
		'angular': {
			deps: [ 'jquery'],
			exports: 'angular'
		},
		'angularRoute': {
			  deps: ['angular'],
			  exports: 'angularRoute',
		  },
		'angularResource': { 
			deps: ['angular'],
			exports: 'angularResource' 
		},
		'angular-ui': {
	    	deps: ['angular']
		},
		'menuBootstrap': {
			deps: ['jquery']
		},
		'angularGrid': {
	    	deps: ['angular']
		},
		'morris': {
			deps: ['jquery']
		},
		'morrisData': {
			deps: ['jquery']
		},
		'raphael': {
			deps: ['jquery']
		},
		'angular-moment': {
	    	deps: ['moment']
		  },
		'dateRangePicker': { 
			deps: ['jquery'], 
		},
		'angularDateRangePicker': { 
			deps: ['angular'], 
		},		
	},
	
	config: {
	    'moment': {
	        noGlobal: true
	    }
	},
});

require([
	'angular',
	'angularRoute',
	'angularResource',
	'angularGrid',
	'moment',
	'dateRangePicker',
	'angularDateRangePicker',
	'domReady',
	'app',
	'jquery',
	'menuBootstrap',
	'morris',
	'morrisData',
	'raphael',
	// Note this is not Twitter Bootstrap
	// but our AngularJS bootstrap
	'bootstrap',
	'routes',
	'controllers/dashboardController',
	'controllers/footerController',
	'controllers/account/accountController',
	'controllers/contact/contactController',
	'controllers/campaign/campaignController',
	'controllers/lead/leadController',
	'controllers/opportunity/opportunityController',
	'controllers/task/taskController',
	'controllers/currentUserController',
	'controllers/modalInstanceController',
	'controllers/alertController',
	'services/accountService',
	'services/contactService',
	'services/campaignService',
	'services/listOfValuesService',
	'services/leadService',
	'services/opportunityService',
	'services/taskService',
	'services/userService',
	'services/alertService',
	'services/footerService',
	'directives/ngbkFocus',
	'directives/ngScrollTo',
	'directives/starRating',
	'directives/stDateRange',
	'directives/stNumberRange',
	//'directives/datepickerPopup',
	'directives/validDate',
	'filters/customFilter',
	// Any individual controller, service, directive or filter file
	// that you add will need to be pulled in here.
	// This will have to be maintained by hand.
	],
	function () {	
		console.log("Loaded :)");    
		return {};
		
	}

//function (angular, app) {
//'use strict';

/*app.config(['$routeProvider',
     function($routeProvider) {
	// Define your Routes here
	$routeProvider.
      when('/contact', {
        templateUrl: 'app/view/contact/contact.html',
        controller: 'contactController'
      }).
      when('/contact/list', {
        templateUrl: 'app/view/contact/list.html',
        controller: 'contactListController'
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
	}
]);
}*/

);