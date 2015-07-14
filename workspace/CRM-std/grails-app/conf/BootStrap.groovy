import crm.std.core.SecAppRole
import crm.std.core.SecAppUser
import crm.std.core.Contact
import crm.std.core.Lead
import crm.std.core.SecAppUserSecAppRole
import crm.std.core.Requestmap

class BootStrap {

    def init = { servletContext ->
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
	
	def testLead1 = new Lead(name: 'Aryanto', email: 'ary@vasco.com', company: 'Vasco', sex: 'M', dateCreated : new Date(), lastUpdated : new Date())
	testLead1.save(failOnError: true)
	
	def testLead2 = new Lead(name: 'Erik', email: 'erik@avaya.com', company: 'Avaya', sex: 'M', dateCreated : new Date(), lastUpdated : new Date())
	testLead2.save(failOnError: true)
	
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
	
	//new Requestmap(url: '/screen/royalPage', configAttribute: 'ROLE_ADMIN').save()
	//new Requestmap(url: '/**', configAttribute: 'IS_AUTHENTICATED_ANONYMOUSLY').save()
	
  }
  
  def destroy = {
  }
}
