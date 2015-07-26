package crm.std.core

import static org.springframework.http.HttpStatus.*
import grails.rest.RestfulController;

import grails.converters.JSON
import org.codehaus.groovy.grails.plugins.web.taglib.ValidationTagLib

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

class ListOfValuesController extends RestfulController{

    static allowedMethods = [index: 'GET', save: 'POST', update: 'PUT', delete: 'DELETE']
	//static regulatedMethods = ['index', 'show', 'save', 'update','delete', 'listIndustry']
	static responseFormats = ['json', 'xml']
	def springSecurityService
	
	ListOfValuesController() {
		super(ListOfValues)
	}

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond ListOfValues.list(params), model:[listOfValuesInstanceCount: ListOfValues.count()]
    }

    def show(ListOfValues listOfValuesInstance) {
        respond listOfValuesInstance
    }

    def create() {
        respond new ListOfValues(params)
    }

    @Transactional
    def save(ListOfValues listOfValuesInstance) {
        if (listOfValuesInstance == null) {
            notFound()
            return
        }

        if (listOfValuesInstance.hasErrors()) {
            respond listOfValuesInstance.errors, view:'create'
            return
        }

        listOfValuesInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'listOfValues.label', default: 'ListOfValues'), listOfValuesInstance.id])
                redirect listOfValuesInstance
            }
            '*' { respond listOfValuesInstance, [status: CREATED] }
        }
    }

    def edit(ListOfValues listOfValuesInstance) {
        respond listOfValuesInstance
    }

    @Transactional
    def update(ListOfValues listOfValuesInstance) {
        if (listOfValuesInstance == null) {
            notFound()
            return
        }

        if (listOfValuesInstance.hasErrors()) {
            respond listOfValuesInstance.errors, view:'edit'
            return
        }

        listOfValuesInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'ListOfValues.label', default: 'ListOfValues'), listOfValuesInstance.id])
                redirect listOfValuesInstance
            }
            '*'{ respond listOfValuesInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(ListOfValues listOfValuesInstance) {

        if (listOfValuesInstance == null) {
            notFound()
            return
        }

        listOfValuesInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'ListOfValues.label', default: 'ListOfValues'), listOfValuesInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'listOfValues.label', default: 'ListOfValues'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
	
	def listIndustry()
	{
		def dataList = ListOfValues.findAllByValueType("Industry")?.collect{it.valueName}
		
		header 'total', dataList.size()
		respond dataList
	}
}
