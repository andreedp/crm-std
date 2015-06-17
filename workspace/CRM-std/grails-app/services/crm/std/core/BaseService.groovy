package crm.std.core

import org.codehaus.groovy.grails.commons.GrailsApplication;
import org.hibernate.Session
import org.springframework.context.ApplicationContext;

abstract class BaseService {
	
	def _grailsApplication
	
	def ApplicationContext applicationContext
	
	def springSecurityService;
	
	
	GrailsApplication getGrailsApplication() {
		if (!_grailsApplication) {
			_grailsApplication = applicationContext.getBean("grailsApplication")
		}
		return _grailsApplication
	}
	
	def getConfig() {
		return grailsApplication.config
	}

}
