package crm.std.core

class SecAppUser {

	transient springSecurityService

	
	String	id
	String username
	String password
	boolean enabled = true
	boolean accountExpired 	= false
	boolean accountLocked 	= false
	boolean passwordExpired = false
	
	String 	name
	String	address
	String	contact
	String	contact2
	String	email
	String	remark
	String  preferences
	
	Date	dateCreated
	Date	lastUpdated
	SecAppUser	createdBy
	SecAppUser	lastModifiedBy

	static transients = ['springSecurityService']

	static constraints = {
		
		id				maxSize:32
		username blank: false, unique: true
		password blank: false
		name		maxSize:64
		contact		maxSize:32, nullable:true, blank: true
		contact2	maxSize:32, nullable:true, blank: true
		email		maxSize:128, nullable:true, blank: true
		address		maxSize:512, nullable:true, blank: true
		remark		maxSize:512, nullable:true, blank: true
		preferences maxSize:2048, nullable:true, blank: true
	
		createdBy			nullable:true
		lastModifiedBy		nullable:true
	}

	static mapping = {		
		id			name:'id',generator:'uuid'
		password column: '`password`'
	}

	Set<SecAppRole> getAuthorities() {
		SecAppUserSecAppRole.findAllBySecAppUser(this).collect { it.secAppRole } as Set
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService.encodePassword(password)
	}
}
