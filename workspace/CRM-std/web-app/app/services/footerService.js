define(['services/services'],
  function(services) {
	
	services.factory('ngScrollToOptions',function() 
	{
	  	this.options = 
	  	{
	      handler : function(el, offset) {
	        if (offset) {
	          var top = $(el).offset().top - offset;
	          window.scrollTo(0, top);
	        }
	        else {
	          el.scrollIntoView();
	        }
	      }
	    };
	    this.$get = function() {
	      return this.options;
	    };
	    this.extend = function(options) {
	      this.options = angular.extend(this.options, options);
	    };
	});
	
	services.factory('ScrollTo', ['$window', 'ngScrollToOptions',
                                       function($window, ngScrollToOptions) {
		
		var service = {};
		
		service.idOrName = function (idOrName, offset, focus) 
		{//find element with the given id or name and scroll to the first element it finds
	        var document = $window.document;
	        
	        if(!idOrName) 
	        {//move to top if idOrName is not provided
	          $window.scrollTo(0, 0);
	        }

	        if(focus === undefined) 
	        { //set default action to focus element
	            focus = true;
	        }

	        //check if an element can be found with id attribute
	        var el = document.getElementById(idOrName);
	        if(!el) 
	        {//check if an element can be found with name attribute if there is no such id
	          el = document.getElementsByName(idOrName);

	          if(el && el.length)
	            el = el[0];
	          else
	            el = null;
	        }

	        if(el) 
	        { //if an element is found, scroll to the element
	          if (focus) 
	          {
	              el.focus();
	          }

	          ngScrollToOptions.handler(el, offset);
	        }
	        
	        //otherwise, ignore
	      } 
		
		return service;
	}]);
	
	services.factory('FooterService', ['$http', '$log', 'User', 
		                                        function($http, $log, User) {
			var service = {};
			service.test = function(){
				$log.info('Test');
			}
			
			service.parseURL = function(url){
				
				if(!url)
				{
					return;
				}			
				
				if(url == 'http://localhost:8080/')
				{
					url = '#'
				}
				else 
				{
					url = url.substring(21);
				}
				
				
				$log.info('[FooterService::parseURL]URL: ' + url);
				
				return url;
			};
			
			return service;        	
	}]);
});