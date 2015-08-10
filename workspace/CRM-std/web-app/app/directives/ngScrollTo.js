define(['directives/directives'], function(directives) {
	directives.directive('scrollTo', ['ScrollTo', function(ScrollTo){
		return {
		      restrict : "AC",
		      compile : function(){
		        
		        return function(scope, element, attr) {
		          element.bind("click", function(event){
		        	  ScrollTo.idOrName(attr.scrollTo, attr.offset);
		          });
		        };
		      }
		    };
	}]);
});