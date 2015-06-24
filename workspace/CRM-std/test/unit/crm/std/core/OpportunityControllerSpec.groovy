package crm.std.core



import grails.test.mixin.*
import spock.lang.*

@TestFor(OpportunityController)
@Mock(Opportunity)
class OpportunityControllerSpec extends Specification {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void "Test the index action returns the correct model"() {

        when:"The index action is executed"
            controller.index()

        then:"The model is correct"
            !model.opportunityInstanceList
            model.opportunityInstanceCount == 0
    }

    void "Test the create action returns the correct model"() {
        when:"The create action is executed"
            controller.create()

        then:"The model is correctly created"
            model.opportunityInstance!= null
    }

    void "Test the save action correctly persists an instance"() {

        when:"The save action is executed with an invalid instance"
            request.contentType = FORM_CONTENT_TYPE
            def opportunity = new Opportunity()
            opportunity.validate()
            controller.save(opportunity)

        then:"The create view is rendered again with the correct model"
            model.opportunityInstance!= null
            view == 'create'

        when:"The save action is executed with a valid instance"
            response.reset()
            populateValidParams(params)
            opportunity = new Opportunity(params)

            controller.save(opportunity)

        then:"A redirect is issued to the show action"
            response.redirectedUrl == '/opportunity/show/1'
            controller.flash.message != null
            Opportunity.count() == 1
    }

    void "Test that the show action returns the correct model"() {
        when:"The show action is executed with a null domain"
            controller.show(null)

        then:"A 404 error is returned"
            response.status == 404

        when:"A domain instance is passed to the show action"
            populateValidParams(params)
            def opportunity = new Opportunity(params)
            controller.show(opportunity)

        then:"A model is populated containing the domain instance"
            model.opportunityInstance == opportunity
    }

    void "Test that the edit action returns the correct model"() {
        when:"The edit action is executed with a null domain"
            controller.edit(null)

        then:"A 404 error is returned"
            response.status == 404

        when:"A domain instance is passed to the edit action"
            populateValidParams(params)
            def opportunity = new Opportunity(params)
            controller.edit(opportunity)

        then:"A model is populated containing the domain instance"
            model.opportunityInstance == opportunity
    }

    void "Test the update action performs an update on a valid domain instance"() {
        when:"Update is called for a domain instance that doesn't exist"
            request.contentType = FORM_CONTENT_TYPE
            controller.update(null)

        then:"A 404 error is returned"
            response.redirectedUrl == '/opportunity/index'
            flash.message != null


        when:"An invalid domain instance is passed to the update action"
            response.reset()
            def opportunity = new Opportunity()
            opportunity.validate()
            controller.update(opportunity)

        then:"The edit view is rendered again with the invalid instance"
            view == 'edit'
            model.opportunityInstance == opportunity

        when:"A valid domain instance is passed to the update action"
            response.reset()
            populateValidParams(params)
            opportunity = new Opportunity(params).save(flush: true)
            controller.update(opportunity)

        then:"A redirect is issues to the show action"
            response.redirectedUrl == "/opportunity/show/$opportunity.id"
            flash.message != null
    }

    void "Test that the delete action deletes an instance if it exists"() {
        when:"The delete action is called for a null instance"
            request.contentType = FORM_CONTENT_TYPE
            controller.delete(null)

        then:"A 404 is returned"
            response.redirectedUrl == '/opportunity/index'
            flash.message != null

        when:"A domain instance is created"
            response.reset()
            populateValidParams(params)
            def opportunity = new Opportunity(params).save(flush: true)

        then:"It exists"
            Opportunity.count() == 1

        when:"The domain instance is passed to the delete action"
            controller.delete(opportunity)

        then:"The instance is deleted"
            Opportunity.count() == 0
            response.redirectedUrl == '/opportunity/index'
            flash.message != null
    }
}
