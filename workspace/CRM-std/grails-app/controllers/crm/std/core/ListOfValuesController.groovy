package crm.std.core

import static org.springframework.http.HttpStatus.*
import grails.rest.RestfulController;

import grails.converters.JSON
import org.codehaus.groovy.grails.plugins.web.taglib.ValidationTagLib

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

class ListOfValuesController extends RestfulController{

	ListOfValuesController() {
		super(ListOfValues)
	}
	
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
	static responseFormats = ['json', 'xml']
	def springSecurityService	

	def listIndustry()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Industry')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listCompany()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Company')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listSex()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Sex')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listTitle()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Contact_Title')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listSalesStage()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Sales_Stage')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listLeadSource()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Lead_Source')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listTaskOwner()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Task_Owner')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listCampaignStatus()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Campaign_Status')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listCampaignType()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Campaign_Type')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listAccountType()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Account_Type')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listLeadStatus()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Lead_Status')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listTaskStatus()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Task_Status')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listPriority()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Priority')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
	def listOpportunityType()
	{
		def c = ListOfValues.createCriteria()
		def dataList = c.list{
			eq('valueType', 'Opportunity_Type')
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
    def index() {
        //params.max = Math.min(max ?: 10, 100)
        //respond ListOfValues.list(params), model:[listOfValuesInstanceCount: ListOfValues.count()]
    
		header 'total', ListOfValues.count()
		respond ListOfValues.list()
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
	
}
