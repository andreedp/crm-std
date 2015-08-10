package crm.std.core

import grails.rest.RestfulController
import grails.transaction.Transactional

import grails.converters.JSON
import org.codehaus.groovy.grails.plugins.web.taglib.ValidationTagLib

class ContactController extends RestfulController{

	ContactController() {
		super(Contact)
	}
	
	static allowedMethods = [index: 'GET', save: 'POST', update: 'PUT', delete: 'DELETE']	
	static responseFormats = ['json', 'xml']	
	def springSecurityService
	
	
	def listTask()
	{
		def contactInstance = Contact.get(params.id)
		
		def criteria = Task.createCriteria()
		def dataList = criteria.list {
			eq("contact", contactInstance)
		}
		
		header 'total', dataList.size()
		respond dataList
	}
		
	@Transactional
	def save(Contact contactInstance) {
		if (contactInstance == null) {
			notFound()
			return
		}
		
		contactInstance.clearErrors()
		contactInstance.validate()
				
		if (contactInstance.hasErrors()) {
			respond contactInstance.errors, view:'create'
			return
		}
		
		
		contactInstance.createdBy = springSecurityService.currentUser
		contactInstance.save flush:true, failOnError: true

		respond contactInstance
	}
	
	@Transactional
	def update(Contact contactInstance) {
		if (contactInstance == null) {
			notFound()
			return
		}
		
		if (contactInstance.hasErrors()) {
			respond contactInstance.errors, view:'edit'
			return
		}
		
		contactInstance.lastModifiedBy = springSecurityService.currentUser
		contactInstance.save flush:true, failOnError: true

		respond contactInstance
	}
	
	def index() {
		
		println Contact.count()
		
		header 'total', Contact.count()		
		respond Contact.list()
		
	}

    @Transactional
    def delete(Contact contactInstance) {

        if (contactInstance == null) {
            notFound()
            return
        }

		try
		{
			contactInstance.delete flush:true, failOnError: true
		}
		catch(Exception exc)
		{
			render status: UNPROCESSABLE_ENTITY, text: exc.getMessage()
			return
		}
		respond contactInstance
    }

    private static def renderErrors(allErrors) {
        def g = new ValidationTagLib()
        def errors = []
        allErrors.fieldErrors.each { error ->
            errors.add([
                    'field' : error.field,
                    'rejected_value' : error.rejectedValue,
                    'message' : g.message(error: error)
            ])
        }
        return errors
    }
	
	protected void notFound() {
		request.withFormat {
			form {
				flash.message = message(code: 'default.not.found.message', args: [message(code: 'contactInstance.label', default: 'Contact'), params.id])
				redirect action: "index", method: "GET"
			}
			'*'{ render status: NOT_FOUND }
		}
	}
}
