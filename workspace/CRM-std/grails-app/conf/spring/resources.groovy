// Place your Spring DSL code here
beans = {
	tenantResolver(crm.std.core.DomainTenantResolver)
	tenantRepository(crm.std.core.CachingTenantRepository)
}


// Activate these bean definitions
// Documentation http://grails.org/doc/latest/guide/single.html#14.2%20Configuring%20Additional%20Beans
// tenantResolver(crm.std.core.DomainTenantResolver)
// tenantRepository(crm.std.core.CachingTenantRepository)
