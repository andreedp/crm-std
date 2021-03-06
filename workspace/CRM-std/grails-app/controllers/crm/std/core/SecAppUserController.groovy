package crm.std.core


import grails.rest.RestfulController
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.converters.JSON

class SecAppUserController extends RestfulController{
//class SecAppUserController{
	
	SecAppUserController() {
		super(SecAppUser)
	}
	
    static allowedMethods = [index: "GET", save: "POST", update: "PUT", delete: "DELETE"]
	static responseFormats = ['json', 'xml']
	def springSecurityService
	
	
	def currentUser()  {
		def principal = springSecurityService.principal
		def username = principal.username
		def result =[:]
		result.username = username
		
		println result.username
		
		respond result
		//respond springSecurityService.getCurrentUser()
	}
	
    def index() {
        //params.max = Math.min(max ?: 10, 100)
        //respond SecAppUser.list(params), model:[secAppUserInstanceCount: SecAppUser.count()]
		
		header 'total', SecAppUser.count()
		respond SecAppUser.list()
    }

    def show(SecAppUser secAppUserInstance) {
        respond secAppUserInstance
    }

    def create() {
        respond new SecAppUser(params)
    }

    @Transactional
    def save(SecAppUser secAppUserInstance) {
        if (secAppUserInstance == null) {
            notFound()
            return
        }

        if (secAppUserInstance.hasErrors()) {
            respond secAppUserInstance.errors, view:'create'
            return
        }

        secAppUserInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'secAppUser.label', default: 'SecAppUser'), secAppUserInstance.id])
                redirect secAppUserInstance
            }
            '*' { respond secAppUserInstance, [status: CREATED] }
        }
    }

    def edit(SecAppUser secAppUserInstance) {
        respond secAppUserInstance
    }

    @Transactional
    def update(SecAppUser secAppUserInstance) {
        if (secAppUserInstance == null) {
            notFound()
            return
        }

        if (secAppUserInstance.hasErrors()) {
            respond secAppUserInstance.errors, view:'edit'
            return
        }

        secAppUserInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'SecAppUser.label', default: 'SecAppUser'), secAppUserInstance.id])
                redirect secAppUserInstance
            }
            '*'{ respond secAppUserInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(SecAppUser secAppUserInstance) {

        if (secAppUserInstance == null) {
            notFound()
            return
        }

        secAppUserInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'SecAppUser.label', default: 'SecAppUser'), secAppUserInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'secAppUser.label', default: 'SecAppUser'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
