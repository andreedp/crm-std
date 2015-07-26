import crm.std.core.SecAppRole
import crm.std.core.SecAppUser
import crm.std.core.Contact
import crm.std.core.Lead
import crm.std.core.Account
import crm.std.core.SecAppUserSecAppRole
import crm.std.core.ListOfValues
import crm.std.core.TaskMapping
import crm.std.core.Requestmap

import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->
	
	/*JSON.registerObjectMarshaller(Account) {
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

    def testUser = new SecAppUser(username: 'admin', enabled: true, password: 'admin')
    testUser.save(flush: true)
	
	def testUser2 = new SecAppUser(username: 'andree', enabled: true, password: '123456')
	testUser2.save(flush: true)

	def testUser1 = new SecAppUser(username: 'user', enabled: true, password: 'user')
	testUser1.save(flush: true)
	
	def testUser3 = new SecAppUser(username: 'billy', enabled: true, password: '123456')
	testUser3.save(flush: true)
	
	def testContact1 = new Contact(name: 'Andree', email: 'adp@phin.com', telephone: '081288728838', sex: 'M', dateCreated : new Date(), lastUpdated : new Date())
	testContact1.save(failOnError: true)
	
	def testContact2 = new Contact(name: 'Agus', email: 'agus@phin.com', telephone: '081311223344', sex: 'M', dateCreated : new Date(), lastUpdated : new Date())
	testContact2.save(failOnError: true)
	
	def testLead1 = new Lead(name: 'Aryanto', email: 'ary@vasco.com', company: 'Vasco', sex: 'M', rating: 6, dateCreated : new Date(), lastUpdated : new Date())
	testLead1.save(failOnError: true)
	
	def testLead2 = new Lead(name: 'Erik', email: 'erik@avaya.com', company: 'Avaya', sex: 'M', rating: 8, dateCreated : new Date(), lastUpdated : new Date())
	testLead2.save(failOnError: true)
	
	def testAccount1 = new Account(name: 'Vasco', email: 'cs@vasco.com', industry: 'Technology', address: 'Hong Kong', website: 'www.vasco.com', dateCreated : new Date(), lastUpdated : new Date())
	testAccount1.save(failOnError: true)
	
	def testAccount2 = new Account(name: 'Avaya', email: 'cs@avaya.com', industry: 'Technology', address: 'United States', website: 'www.avaya.com', dateCreated : new Date(), lastUpdated : new Date())
	testAccount2.save(failOnError: true)
	
    SecAppUserSecAppRole.create testUser, adminRole, true
	SecAppUserSecAppRole.create testUser1, userRole, true		
	SecAppUserSecAppRole.create testUser2, adminRole, true
	SecAppUserSecAppRole.create testUser3, userRole, true
	
	
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
	new Requestmap(url: '/account/*', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/account/*', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
	new Requestmap(url: '/account', configAttribute: 'ROLE_USER').save(flush:true, failOnError: true)
	new Requestmap(url: '/account', configAttribute: 'ROLE_ADMIN').save(flush:true, failOnError: true)
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
	new ListOfValues(valueType: 'Task_Owner',valueName:'Service').save(flush:true, failOnError: true)
	
	//new Requestmap(url: '/screen/royalPage', configAttribute: 'ROLE_ADMIN').save()
	//new Requestmap(url: '/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save()
	
  }	
	
  def destroy = {
  }
}
