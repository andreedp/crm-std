package crm.std.core



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class TaskMappingController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond TaskMapping.list(params), model:[taskMappingInstanceCount: TaskMapping.count()]
    }

    def show(TaskMapping taskMappingInstance) {
        respond taskMappingInstance
    }

    def create() {
        respond new TaskMapping(params)
    }

    @Transactional
    def save(TaskMapping taskMappingInstance) {
        if (taskMappingInstance == null) {
            notFound()
            return
        }

        if (taskMappingInstance.hasErrors()) {
            respond taskMappingInstance.errors, view:'create'
            return
        }

        taskMappingInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'taskMapping.label', default: 'TaskMapping'), taskMappingInstance.id])
                redirect taskMappingInstance
            }
            '*' { respond taskMappingInstance, [status: CREATED] }
        }
    }

    def edit(TaskMapping taskMappingInstance) {
        respond taskMappingInstance
    }

    @Transactional
    def update(TaskMapping taskMappingInstance) {
        if (taskMappingInstance == null) {
            notFound()
            return
        }

        if (taskMappingInstance.hasErrors()) {
            respond taskMappingInstance.errors, view:'edit'
            return
        }

        taskMappingInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'TaskMapping.label', default: 'TaskMapping'), taskMappingInstance.id])
                redirect taskMappingInstance
            }
            '*'{ respond taskMappingInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(TaskMapping taskMappingInstance) {

        if (taskMappingInstance == null) {
            notFound()
            return
        }

        taskMappingInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'TaskMapping.label', default: 'TaskMapping'), taskMappingInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'taskMapping.label', default: 'TaskMapping'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
