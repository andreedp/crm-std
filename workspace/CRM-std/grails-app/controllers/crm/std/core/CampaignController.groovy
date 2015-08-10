package crm.std.core

import grails.rest.RestfulController
import grails.transaction.Transactional

import grails.converters.JSON
import org.codehaus.groovy.grails.plugins.web.taglib.ValidationTagLib

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = false)
class CampaignController {

   static allowedMethods = [index: "GET", save: "POST", update: "PUT", delete: "DELETE"]
	static responseFormats = ['json', 'xml']
	def springSecurityService
	
	def listTask()
	{
		def campaignInstance = Campaign.get(params.id)
		
		def criteria = Task.createCriteria()
		def dataList = criteria.list {
			eq("campaign", campaignInstance)
		}
		
		header 'total', dataList.size()
		respond dataList
	}
	
    def index() {
        //params.max = Math.min(max ?: 10, 100)
        //respond Campaign.list(params), model:[campaignInstanceCount: Campaign.count()]
    
		header 'total', Campaign.count()
		respond Campaign.list()
	}

    def show(Campaign campaignInstance) {
        respond campaignInstance
    }

    def create() {
        respond new Campaign(params)
    }

    @Transactional
    def save(Campaign campaignInstance) {
        if (campaignInstance == null) {
            notFound()
            return
        }

        if (campaignInstance.hasErrors()) {
            respond campaignInstance.errors, view:'create'
            return
        }
		
		println campaignInstance

		campaignInstance.createdBy = springSecurityService.currentUser
        campaignInstance.save flush:true, failOnError: true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'campaign.label', default: 'Campaign'), campaignInstance.id])
                redirect campaignInstance
            }
            '*' { respond campaignInstance, [status: CREATED] }
        }
    }

    def edit(Campaign campaignInstance) {
        respond campaignInstance
    }

    @Transactional
    def update(Campaign campaignInstance) {
        if (campaignInstance == null) {
            notFound()
            return
        }

        if (campaignInstance.hasErrors()) {
            respond campaignInstance.errors, view:'edit'
            return
        }

        campaignInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'Campaign.label', default: 'Campaign'), campaignInstance.id])
                redirect campaignInstance
            }
            '*'{ respond campaignInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(Campaign campaignInstance) {

        if (campaignInstance == null) {
            notFound()
            return
        }

        campaignInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'Campaign.label', default: 'Campaign'), campaignInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'campaign.label', default: 'Campaign'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
