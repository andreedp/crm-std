define(['directives/directives'], function(directives) {
	directives.directive('searchForm', function() {
		return {
	        transclude: true,
	        restrict: 'EA',
	        template: '<a ng-click="open()" ng-transclude>{{name}}</a>',
	        scope: {
	            useCtrl: "@",
	            email: "@"
	        },
	        link: function(scope, element, attrs) {

	            console.log('Attrs: ', attrs);
//	            console.log('SCOPE: ', scope);Z

	            scope.open = function(){


	                var modalInstance = $modal.open({
	                    templateUrl: templateDir+attrs.instanceTemplate +'.tpl.html',
	                    controller:  scope.useCtrl,
	                    size: 'lg',
	                    windowClass: 'app-modal-window',
	                    backdrop: true,
	                    resolve: {
	                        custEmail: function(){
	                            return {email: scope.email};
	                        }
	                    }

	                });

	                modalInstance.result.then(function(){
	                    console.log('Finished');
	                }, function(){
	                    console.log('Modal dismissed at : ' + new Date());
	                });
	            };
	        }
	    };
	});
});