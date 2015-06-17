package crm.std.core

import grails.plugin.multitenant.core.Tenant

/**
 * TODO: Implement me!
 *
 * @see http://multi-tenant.github.com/grails-multi-tenant-single-db/
 */
class SecAppTenant implements Tenant {

    String name
	boolean 		enabled = true
	boolean 		accountExpired = false
	boolean 		accountLocked = false

    static constraints = {
        name blank: false, unique: true
    }

    Integer tenantId() {
        id
    }
}
