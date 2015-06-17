package crm.std.core

import org.apache.commons.lang.builder.HashCodeBuilder

class SecAppUserSecAppRole implements Serializable {

	private static final long serialVersionUID = 1

	SecAppUser secAppUser
	SecAppRole secAppRole

	boolean equals(other) {
		if (!(other instanceof SecAppUserSecAppRole)) {
			return false
		}

		other.secAppUser?.id == secAppUser?.id &&
			other.secAppRole?.id == secAppRole?.id
	}

	int hashCode() {
		def builder = new HashCodeBuilder()
		if (secAppUser) builder.append(secAppUser.id)
		if (secAppRole) builder.append(secAppRole.id)
		builder.toHashCode()
	}

	static SecAppUserSecAppRole get(long secAppUserId, long secAppRoleId) {
		SecAppUserSecAppRole.where {
			secAppUser == SecAppUser.load(secAppUserId) &&
			secAppRole == SecAppRole.load(secAppRoleId)
		}.get()
	}

	static SecAppUserSecAppRole create(SecAppUser secAppUser, SecAppRole secAppRole, boolean flush = false) {
		new SecAppUserSecAppRole(secAppUser: secAppUser, secAppRole: secAppRole).save(flush: flush, insert: true)
	}

	static boolean remove(SecAppUser u, SecAppRole r, boolean flush = false) {

		int rowCount = SecAppUserSecAppRole.where {
			secAppUser == SecAppUser.load(u.id) &&
			secAppRole == SecAppRole.load(r.id)
		}.deleteAll()

		rowCount > 0
	}

	static void removeAll(SecAppUser u) {
		SecAppUserSecAppRole.where {
			secAppUser == SecAppUser.load(u.id)
		}.deleteAll()
	}

	static void removeAll(SecAppRole r) {
		SecAppUserSecAppRole.where {
			secAppRole == SecAppRole.load(r.id)
		}.deleteAll()
	}

	static mapping = {
		id composite: ['secAppRole', 'secAppUser']
		version false
	}
}
