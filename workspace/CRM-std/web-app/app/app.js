define(['angular', 'angularRoute', 'angularResource', 'angularGrid', 'angular-moment', 'angular-ui', 'dateRangePicker', 'controllers/controllers',
        'services/services', 'filters/filters',
        'directives/directives'], function (angular) {
	return angular.module('crmApp', ['ngRoute', 'ngResource', 'smart-table', 'angularMoment', 'ui.bootstrap', 'daterangepicker', 'controllers', 'services',
                                'filters', 'directives']);
});

/*'use strict';

var crmApp = angular.module('crmApp', [
  'ngRoute',  
  'contactControllers', 
  'contactListControllers',
  'dashboardControllers',
  'contactServices'
]);

crmApp.config(['$routeProvider',
  function($routeProvider) {
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
  }]);*/
