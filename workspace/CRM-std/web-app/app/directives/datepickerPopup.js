define(['directives/directives'], function(directives) {
	directives.directive('datepickerPopup', function() {
		/*return {
	        require: 'ngModel',
	        link: function (scope: ng.IScope, elm: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) {                // Process the output from the datepicker
	            ngModel.$parsers.push(function (viewValue: string|number|Date) {

	                if (angular.isDate(viewValue) && !isNaN(<number>viewValue)) {
	                    return viewValue.valueOf();
	                }

	                // otherwise - do nothing
	                return viewValue;
	            });
	        },
	    };*/

		/*return {
	        restrict: 'EAC',
	        require: 'ngModel',
	        link: function(scope, element, attr, controller) {
	      //remove the default formatter from the input directive to prevent conflict
	      controller.$formatters.shift();
	  }
	}*/
	function link(scope, element, attrs, ngModel) {
		// View -> Model
	    ngModel.$parsers.push(function (value) {
	      return Date.parse(value);
	    });
	  }

	  return {
	    restrict: 'A',
	    require: 'ngModel',
	    link: link
	  };
		
	});
});