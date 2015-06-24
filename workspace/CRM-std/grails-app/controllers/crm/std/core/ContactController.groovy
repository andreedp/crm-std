package crm.std.core

import grails.rest.RestfulController
import grails.transaction.Transactional

import grails.converters.JSON
import org.codehaus.groovy.grails.plugins.web.taglib.ValidationTagLib

class ContactController extends RestfulController{

	static responseFormats = ['json', 'xml']	
	def springSecurityService
	
	ContactController() {
		super(Contact)
	}
	
    def contactService;
	
    /*def save() {
        def json = request.JSON;
        def contact = null;
        def message;
        if(json.id){
            contact = contactService.get(json.id as long)
            message = "Contact Updated "
        };
        if(!contact){
            contact = new Contact()
            message = "Contact Created "
        }
        bindData(contact,json)
        def res = [:]
        if(!contact.validate()){
            def errors = renderErrors(contact.errors)
            res.status = "error"
            res.errors = errors
            render res as JSON
            return
        }
        contactService.save(contact)
        res.status = "success"
        res.message = message
        render res as JSON
    }*/
	
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
	
	def index() {
		
		header 'total', Contact.count()		
		respond Contact.list()
		
	}

    def edit() {
        Contact contact = contactService.get(params.id as long);
        render contact as JSON
    }

    def details() {
        Contact contact = contactService.get(params.id as long);
        render contact as JSON
    }

    def delete() {
        Contact contact = contactService.get(params.id as long);
        if(!contact){
            Map message = ["message":"Contact ${params.id} not found"]
            render message as JSON
            return
        }
        contactService.delete(contact)
        Map message = ["message":"Contact ${params.id} deleted"]
        render message as JSON
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
