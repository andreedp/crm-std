package crm.std.core

class SecAppUser {

	transient springSecurityService

	
	String	id
	String username
	String password
	boolean enabled = true
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired

	static transients = ['springSecurityService']

	static constraints = {
		
		id				maxSize:32
		username blank: false, unique: true
		password blank: false
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
