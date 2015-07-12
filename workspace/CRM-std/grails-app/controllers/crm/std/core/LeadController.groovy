package crm.std.core

import static org.springframework.http.HttpStatus.*
import grails.rest.RestfulController;
import grails.transaction.Transactional

import grails.converters.JSON
import org.codehaus.groovy.grails.plugins.web.taglib.ValidationTagLib

class LeadController extends RestfulController{

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
	static responseFormats = ['json', 'xml']
	def springSecurityService

	LeadController() {
		super(Lead)
	}
    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Lead.list(params), model:[leadInstanceCount: Lead.count()]
    }

    def show(Lead leadInstance) {
        respond leadInstance
    }

    def create() {
        respond new Lead(params)
    }

    @Transactional
    def save(Lead leadInstance) {
        if (leadInstance == null) {
            notFound()
            return
        }

        if (leadInstance.hasErrors()) {
            respond leadInstance.errors, view:'create'
            return
        }

        leadInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'lead.label', default: 'Lead'), leadInstance.id])
                redirect leadInstance
            }
            '*' { respond leadInstance, [status: CREATED] }
        }
    }

    def edit(Lead leadInstance) {
        respond leadInstance
    }

    @Transactional
    def update(Lead leadInstance) {
        if (leadInstance == null) {
            notFound()
            return
        }

        if (leadInstance.hasErrors()) {
            respond leadInstance.errors, view:'edit'
            return
        }

        leadInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'Lead.label', default: 'Lead'), leadInstance.id])
                redirect leadInstance
            }
            '*'{ respond leadInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(Lead leadInstance) {

        if (leadInstance == null) {
            notFound()
            return
        }

        leadInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'Lead.label', default: 'Lead'), leadInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'lead.label', default: 'Lead'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
