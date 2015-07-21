package crm.std.core

import static org.springframework.http.HttpStatus.*
import grails.rest.RestfulController;
import grails.transaction.Transactional

import grails.converters.JSON
import org.codehaus.groovy.grails.plugins.web.taglib.ValidationTagLib

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

class OpportunityController extends RestfulController{

    static allowedMethods = [index: "GET", save: "POST", update: "PUT", delete: "DELETE"]
	static responseFormats = ['json', 'xml']
	def springSecurityService

	OpportunityController() {
		super(Opportunity)
	}
	
    def index() {
        //params.max = Math.min(max ?: 10, 100)
        //respond Opportunity.list(params), model:[opportunityInstanceCount: Opportunity.count()]
    	
		header 'total', Opportunity.count()
		respond Opportunity.list()
	}

    def show(Opportunity opportunityInstance) {
        respond opportunityInstance
    }

    def create() {
        respond new Opportunity(params)
    }

    @Transactional
    def save(Opportunity opportunityInstance) {
        if (opportunityInstance == null) {
            notFound()
            return
        }

        if (opportunityInstance.hasErrors()) {
            respond opportunityInstance.errors, view:'create'
            return
        }

        opportunityInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'opportunity.label', default: 'Opportunity'), opportunityInstance.id])
                redirect opportunityInstance
            }
            '*' { respond opportunityInstance, [status: CREATED] }
        }
    }

    def edit(Opportunity opportunityInstance) {
        respond opportunityInstance
    }

    @Transactional
    def update(Opportunity opportunityInstance) {
        if (opportunityInstance == null) {
            notFound()
            return
        }

        if (opportunityInstance.hasErrors()) {
            respond opportunityInstance.errors, view:'edit'
            return
        }

        opportunityInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'Opportunity.label', default: 'Opportunity'), opportunityInstance.id])
                redirect opportunityInstance
            }
            '*'{ respond opportunityInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(Opportunity opportunityInstance) {

        if (opportunityInstance == null) {
            notFound()
            return
        }

        opportunityInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'Opportunity.label', default: 'Opportunity'), opportunityInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'opportunity.label', default: 'Opportunity'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
