class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }       
		
		"/"(controller:"Main", action:"index")
		"/login/$action?"(controller: "Login")
		"/logout/$action?"(controller: "Logout")
        "500"(view:'/error')
		
		
		"/secappuser"(resources:"SecAppUser")
		"/contact"(resources:"Contact")
		"/lead"(resources:"Lead")
		"/opportunity"(resources:"Opportunity")
		"/account"(resources:"Account")
		"/campaign"(resources:"Campaign")		
		"/listofvalues"(resources:"ListOfValues")
		"/task"(resources:"Task")
		
	}
}
