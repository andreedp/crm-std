class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }       
		
		"/"(controller:"main", action:"index")
		"/login/$action?"(controller: "login")
		"/logout/$action?"(controller: "logout")
        "500"(view:'/error')
		
		
		"/secappuser"(resources:"SecAppUser")
		"/contact"(resources:"contact")
		"/lead"(resources:"lead")		
		
	}
}
