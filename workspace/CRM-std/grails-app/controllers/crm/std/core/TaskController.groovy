package crm.std.core

import static org.springframework.http.HttpStatus.*
import grails.rest.RestfulController;
import grails.transaction.Transactional

import grails.converters.JSON
import org.codehaus.groovy.grails.plugins.web.taglib.ValidationTagLib

@Transactional(readOnly = false)
class TaskController extends RestfulController{

	TaskController() {
		super(Task)
	}
	
    static allowedMethods = [index: 'GET', save: 'POST', update: 'PUT', delete: 'DELETE']
	static responseFormats = ['json', 'xml']
	def springSecurityService
	
    def index() {
        //params.max = Math.min(max ?: 10, 100)
        //respond Task.list(params), model:[taskInstanceCount: Task.count()]
    
		header 'total', Task.count()
		respond Task.list()
	}

    def show(Task taskInstance) {
        respond taskInstance
    }

    def create() {
        respond new Task(params)
    }

    @Transactional
    def save(Task taskInstance) {
        if (taskInstance == null) {
            notFound()
            return
        }

		//taskInstance.startDate = Date.parse( 'MM/dd/yyyy', taskInstance.startDate )
		
        taskInstance.clearErrors()
		taskInstance.validate()
				
		if (taskInstance.hasErrors()) {
			respond taskInstance.errors, view:'create'
			return
		}
		
		
		taskInstance.createdBy = springSecurityService.currentUser
		taskInstance.save flush:true, failOnError: true

		respond taskInstance
    }

    def edit(Task taskInstance) {
        respond taskInstance
    }

    @Transactional
    def update(Task taskInstance) {
        if (taskInstance == null) {
            notFound()
            return
        }

        if (taskInstance.hasErrors()) {
            respond taskInstance.errors, view:'edit'
            return
        }

        taskInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'Task.label', default: 'Task'), taskInstance.id])
                redirect taskInstance
            }
            '*'{ respond taskInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(Task taskInstance) {

        if (taskInstance == null) {
            notFound()
            return
        }

        taskInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'Task.label', default: 'Task'), taskInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'task.label', default: 'Task'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
