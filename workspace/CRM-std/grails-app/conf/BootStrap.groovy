import crm.std.core.SecAppRole
import crm.std.core.SecAppUser
import crm.std.core.Campaign
import crm.std.core.Contact
import crm.std.core.Lead
import crm.std.core.Account
import crm.std.core.Opportunity
import crm.std.core.Task
import crm.std.core.SecAppUserSecAppRole
import crm.std.core.ListOfValues
import crm.std.core.TaskMapping
import crm.std.core.Requestmap
import java.util.Date;
import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->
	
	/*JSON.registerObjectMarshaller(crm.std.core.Account) {
		def output = [:]
		output['id'] = it.id
		output['name'] = it.name
		output['company'] = it.company
		output['address'] = it.address
		output['email'] = it.email
		output['type'] = it.type
		output['industry'] = it.industry
		output['description'] = it.description
		output['dateCreated'] = it.dateCreated
		//output['reviewer'] = ["id": it.reviewer.id, "name": it.reviewer.getFullName()]
		//output['reviewedUser'] = ["id": it.reviewedUser.id, "name": it.reviewedUser.getFullName()]
	
		return output;
	}*/
	
    def adminRole = new SecAppRole(authority: 'ROLE_ADMIN').save(flush: true)
    def userRole = new SecAppRole(authority: 'ROLE_USER').save(flush: true)

    def testUser = new SecAppUser(username: 'admin', name:'admin', address:'localhost', email:'admin@local.com', enabled: true, password: 'admin')
    testUser.save(flush: true)
	
	def testUser2 = new SecAppUser(username: 'andree', name:'andree dp', address:'jakarta', email:'andree@local.com', enabled: true, password: '123456')
	testUser2.save(flush: true)

	def testUser1 = new SecAppUser(username: 'user',name:'user', address:'localhost', email:'user@local.com',  enabled: true, password: 'user')
	testUser1.save(flush: true)
	
	def testUser3 = new SecAppUser(username: 'billy', name:'billy in love', address:'jakarta', email:'billy@local.com', enabled: true, password: '123456')
	testUser3.save(flush: true)
	
	def testContact1 = new Contact(name: 'Andree', email: 'adp@phin.com', telephone: '081288728838', sex: 'M', dateCreated : new Date(), lastUpdated : new Date())
	testContact1.save(failOnError: true)
	
	def testContact2 = new Contact(name: 'Willy', email: 'willy@phin.com', telephone: '081311223344', sex: 'M', dateCreated : new Date(), lastUpdated : new Date())
	testContact2.save(failOnError: true)
	
	def testLead1 = new Lead(name: 'Aryanto', email: 'ary@vasco.com', company: 'Vasco', sex: 'M', rating: 6, dateCreated : new Date(), lastUpdated : new Date())
	testLead1.save(failOnError: true)
	
	def testLead2 = new Lead(name: 'Erik', email: 'erik@avaya.com', company: 'Avaya', sex: 'M', rating: 8, dateCreated : new Date(), lastUpdated : new Date())
	testLead2.save(failOnError: true)
	
	def testAccount1 = new Account(name: 'Vasco', email: 'cs@vasco.com', industry: 'Technology', address: 'Hong Kong', website: 'www.vasco.com', dateCreated : new Date(), lastUpdated : new Date())
	testAccount1.save(failOnError: true)
	
	def testAccount2 = new Account(name: 'Avaya', email: 'cs@avaya.com', industry: 'Technology', address: 'United States', website: 'www.avaya.com', dateCreated : new Date(), lastUpdated : new Date())
	testAccount2.save(failOnError: true)
	
	def testOpp1 = new Opportunity(name: 'IVR Payment', type: 'Existing Business', opportunityAmount: '100000', dateCreated : new Date(), lastUpdated : new Date())
	testOpp1.save(failOnError: true)
	
	def testOpp2 = new Opportunity(name: 'New token purchase', type: 'New Business', opportunityAmount: '500000', dateCreated : new Date(), lastUpdated : new Date())
	testOpp2.save(failOnError: true)
	
	
    SecAppUserSecAppRole.create testUser, adminRole, true
	SecAppUserSecAppRole.create testUser1, adminRole, true		
	SecAppUserSecAppRole.create testUser2, adminRole, true
	SecAppUserSecAppRole.create testUser3, adminRole, true
	
	
	for (String url in [
		'/**/favicon.ico',
		'/assets/**', '/**/js/**', '/**/css/**', '/**/images/**','/**/app/**','/**/fonts/**','/**/vendor/**',
		'/login', '/login.*', '/login/*',
		'/logout', '/logout.*', '/logout/*']) {
	 new Requestmap(url: url, configAttribute: 'permitAll').save()
  }
	
	new Requestmap(url: '/', configAttribute: 'IS_AUTHENTICATED_FULLY').save(flush:true, failOnError: true)
	new Requestmap(url: '/main/index', configAttribute: 'IS_AUTHENTICATED_FULLY').save(flush:true, failOnError: true)
	new Requestmap(url: '/main/tenantList', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/contact', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/contact', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/dashboard', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/dashboard', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)	
	new Requestmap(url: '/contact/list', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/contact/list', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)	
	new Requestmap(url: '/contact/view', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/contact/view', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/contact/edit', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/contact/edit', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/contact/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/contact/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/contact/listTask/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/contact/listTask/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/lead', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/lead', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/lead/list', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/lead/list', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)	
	new Requestmap(url: '/lead/view', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/lead/view', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/lead/edit', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/lead/edit', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/lead/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/lead/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/lead/listTask/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/lead/listTask/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/opportunity', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/opportunity', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/opportunity/list', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/opportunity/list', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/opportunity/view', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/opportunity/view', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/opportunity/edit', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/opportunity/edit', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/opportunity/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/opportunity/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/opportunity/listTask/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/opportunity/listTask/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/campaign', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/campaign', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/campaign/list', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/campaign/list', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/campaign/view', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/campaign/view', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/campaign/edit', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/campaign/edit', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/campaign/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/campaign/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/campaign/listTask/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/campaign/listTask/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/task', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/task', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/task/list', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/task/list', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/task/view', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/task/view', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/task/edit', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/task/edit', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/task/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/task/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/account/list', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/account/list', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/account/view', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/account/view', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/account/edit', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/account/edit', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/account/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/account/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/account', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/account', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/account/listTask/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/account/listTask/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/listofvalues/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/listofvalues/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/listofvalues/', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/listofvalues/', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/listofvalues/listIndustry', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/listofvalues/listIndustry', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/secAppUser', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/secAppUser', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)	
	new Requestmap(url: '/secAppUser/currentUser', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)	
	new Requestmap(url: '/secAppUser/currentUser', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/static/**',configAttribute:'IS_AUTHENTICATED_ANONYMOUSLY').save(flush:true, failOnError: true)
	new Requestmap(url: '/vendor/**',configAttribute:'IS_AUTHENTICATED_ANONYMOUSLY').save(flush:true, failOnError: true)
	new Requestmap(url: '/css/**',configAttribute:'IS_AUTHENTICATED_ANONYMOUSLY').save(flush:true, failOnError: true)
	new Requestmap(url: '/images/**',configAttribute:'IS_AUTHENTICATED_ANONYMOUSLY').save(flush:true, failOnError: true)
	new Requestmap(url: '/vendor/**',configAttribute:'IS_AUTHENTICATED_ANONYMOUSLY').save(flush:true, failOnError: true)
	new Requestmap(url: '/j_spring_security_check',configAttribute:'IS_AUTHENTICATED_ANONYMOUSLY').save(flush:true, failOnError: true)	 
	
	new ListOfValues(valueType: 'Industry',valueName:'Technology').save(flush:true, failOnError: true)	
	new ListOfValues(valueType: 'Industry',valueName:'Banking').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Industry',valueName:'Communications').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Industry',valueName:'Consulting').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Industry',valueName:'Government').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Company',valueName:'Avaya').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Company',valueName:'Nuance').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Company',valueName:'Vasco').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Company',valueName:'Datacard').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Company',valueName:'Juniper').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Status',valueName:'Planning').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Status',valueName:'Active').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Status',valueName:'Inactive').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Status',valueName:'Complete').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Status',valueName:'In Queue').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Status',valueName:'Sending').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Type',valueName:'Telesales').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Type',valueName:'Email').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Type',valueName:'Web').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Type',valueName:'Mail').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Type',valueName:'Print').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Type',valueName:'Radio').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Type',valueName:'NewsLetter').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Campaign_Type',valueName:'Television').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Sales_Stage',valueName:'Prospecting').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Sales_Stage',valueName:'Qualification').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Sales_Stage',valueName:'Negotiation').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Sales_Stage',valueName:'Negotiation').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Sales_Stage',valueName:'Closed Won').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Sales_Stage',valueName:'Closed Lost').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Sex',valueName:'M').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Sex',valueName:'F').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Contact_Title',valueName:'Mr.').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Contact_Title',valueName:'Ms.').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Contact_Title',valueName:'Mrs.').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Source',valueName:'Campaign').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Source',valueName:'Email').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Source',valueName:'Web Site').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Source',valueName:'Direct Mail').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Source',valueName:'Partner').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Source',valueName:'Employee ').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Source',valueName:'Exisiting Customer').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Task_Owner',valueName:'Account').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Task_Owner',valueName:'Campaign').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Task_Owner',valueName:'Contact').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Task_Owner',valueName:'Lead').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Task_Owner',valueName:'Opportunity').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Account_Type',valueName:'Customer').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Account_Type',valueName:'Competitor').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Account_Type',valueName:'Partner').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Account_Type',valueName:'Prospect').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Account_Type',valueName:'Reseller').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Account_Type',valueName:'Other').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Status',valueName:'New').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Status',valueName:'Assigned').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Status',valueName:'In Process').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Status',valueName:'Converted').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Status',valueName:'Recycled').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Lead_Status',valueName:'Dead').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Task_Status',valueName:'Not Started').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Task_Status',valueName:'In Progress').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Task_Status',valueName:'Completed').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Task_Status',valueName:'Pending Input').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Task_Status',valueName:'Deffered').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Priority',valueName:'High').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Priority',valueName:'Medium').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Priority',valueName:'Low').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Opportunity_Type',valueName:'Existing Business').save(flush:true, failOnError: true)
	new ListOfValues(valueType: 'Opportunity_Type',valueName:'New Business').save(flush:true, failOnError: true)
	
	JSON.registerObjectMarshaller(Date) {
		return it?.format("yyyy-MM-dd'T'HH:mm:ssZ")
	}
	
	JSON.registerObjectMarshaller(Account) {
		def output = [:]
		output['id'] = it.id
		output['name'] = it.name
		output['company'] = it.company
		output['address'] = it.address
		output['email'] = it.email
		output['type'] = it.type
		output['industry'] = it.industry
		output['assignTo'] = it.assignTo
		output['campaign'] = it.campaign
		output['description'] = it.description
		output['dateCreated'] = it.dateCreated
		output['createdBy'] = [id: it.createdBy?.id, username: it.createdBy?.username ]
		output['lastModifiedBy'] = [id: it.lastModifiedBy?.id, username: it.lastModifiedBy?.username ]
		
		return output;
	}
	
	JSON.registerObjectMarshaller(Campaign) {
		def output = [:]
		output['id'] = it.id
		output['name'] = it.name
		output['currency'] = it.currency
		output['budget'] = it.budget
		output['actualCost'] = it.actualCost
		output['expectedCost'] = it.expectedCost
		output['expectedRevenue'] = it.expectedRevenue
		output['objective'] = it.objective
		output['startDate'] = it.startDate
		output['endDate'] = it.endDate
		output['status'] = it.status		
		output['type'] = it.type
		output['description'] = it.description
		output['assignTo'] = it.assignTo
		output['dateCreated'] = it.dateCreated
		output['createdBy'] = [id: it.createdBy?.id, username: it.createdBy?.username ]
		output['lastModifiedBy'] = [id: it.lastModifiedBy?.id, username: it.lastModifiedBy?.username ]
		
		return output;
	}	
	
	JSON.registerObjectMarshaller(Contact) {
		def output = [:]
		output['id'] = it.id
		output['name'] = it.name
		output['sex'] = it.sex
		output['dob'] = it.dob
		output['address'] = it.address
		output['email'] = it.email
		output['telephone'] = it.telephone
		output['account'] = it.account
		output['assignTo'] = it.assignTo
		output['campaign'] = it.campaign
		output['leadSource'] = it.leadSource
		output['description'] = it.description
		output['dateCreated'] = it.dateCreated
		output['createdBy'] = [id: it.createdBy?.id, username: it.createdBy?.username ]
		output['lastModifiedBy'] = [id: it.lastModifiedBy?.id, username: it.lastModifiedBy?.username ]
		
		return output;
	}
	
	JSON.registerObjectMarshaller(Lead) {
		def output = [:]
		output['id'] = it.id
		output['name'] = it.name
		output['sex'] = it.sex
		output['address'] = it.address
		output['email'] = it.email
		output['socialMedia'] = it.socialMedia
		output['company'] = it.company
		output['status'] = it.status
		output['notes'] = it.notes
		output['department'] = it.department
		output['nextStep'] = it.nextStep
		output['notes'] = it.notes
		output['rating'] = it.rating
		output['budget'] = it.budget
		output['assignTo'] = it.assignTo
		output['campaign'] = it.campaign
		output['leadSource'] = it.leadSource
		output['description'] = it.description
		output['dateCreated'] = it.dateCreated
		output['createdBy'] = [id: it.createdBy?.id, username: it.createdBy?.username ]
		output['lastModifiedBy'] = [id: it.lastModifiedBy?.id, username: it.lastModifiedBy?.username ]
		
		return output;
	}
	
	JSON.registerObjectMarshaller(Opportunity) {
		def output = [:]
		output['id'] = it.id
		output['name'] = it.name
		output['currency'] = it.currency
		output['opportunityAmount'] = it.opportunityAmount
		output['account'] = it.account
		output['closeDate'] = it.closeDate
		output['salesStage'] = it.salesStage
		output['type'] = it.type
		output['probability'] = it.probability
		output['leadSource'] = it.leadSource
		output['nextStep'] = it.nextStep
		output['campaign'] = it.campaign
		output['description'] = it.description
		output['assignTo'] = it.assignTo
		output['dateCreated'] = it.dateCreated
		output['createdBy'] = [id: it.createdBy?.id, username: it.createdBy?.username ]
		output['lastModifiedBy'] = [id: it.lastModifiedBy?.id, username: it.lastModifiedBy?.username ]
		
		return output;
	}
	
	JSON.registerObjectMarshaller(Task) {
		def output = [:]
		output['id'] = it.id
		output['name'] = it.name
		output['relatedTo'] = it.relatedTo
		output['contactName'] = it.contactName
		output['startDate'] = it.startDate
		output['dueDate'] = it.dueDate
		output['priority'] = it.priority
		output['status'] = it.status
		output['lead'] = it.lead
		output['account'] = it.account
		output['opportunity'] = it.opportunity
		output['contact'] = it.contact
		output['description'] = it.description
		output['assignTo'] = it.assignTo
		output['dateCreated'] = it.dateCreated
		output['createdBy'] = [id: it.createdBy?.id, username: it.createdBy?.username ]
		output['lastModifiedBy'] = [id: it.lastModifiedBy?.id, username: it.lastModifiedBy?.username ]
		
		return output;
	}
	
	//new Requestmap(url: '/screen/royalPage', configAttribute: 'ROLE_ADMIN').save()
	//new Requestmap(url: '/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save()
	
  }	
	
  def destroy = {
  }
}
