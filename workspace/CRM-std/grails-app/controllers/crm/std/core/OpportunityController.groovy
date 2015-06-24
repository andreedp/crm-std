package crm.std.core



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class OpportunityController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Opportunity.list(params), model:[opportunityInstanceCount: Opportunity.count()]
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
