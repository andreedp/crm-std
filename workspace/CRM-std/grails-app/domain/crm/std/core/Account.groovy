package crm.std.core

import java.util.Date;

class Account {

	String	id
	String name
	String website
	String officePhone
	String Fax
	String billingAddress
	String shippingAddress
	String email
	String type
	BigDecimal annualRevenue
	String industry
	String employees
	String description
	String assignTo
	String memberOf
	String campaign
	SecAppUser	createdBy
	SecAppUser	lastModifiedBy
	Date	dateCreated
	Date	lastUpdated
	
    static constraints = {
		id				maxSize:32
		name			maxSize:128
		billingAddress	maxSize:512, nullable:true, blank: true
		shippingAddress	maxSize:512, nullable:true, blank: true
		email			maxSize:128, nullable:true, blank: true
		description		maxSize:512, nullable:true, blank: true
		officePhone		maxSize:128, nullable:true, blank: true
		fax				maxSize:128, nullable:true, blank: true
		website			maxSize:128, nullable:true, blank: true
		type			maxSize:128, nullable:true, blank: true
		annualRevenue	nullable:true, blank: true
		industry		maxSize:128, nullable:true, blank: true
		employees		maxSize:128, nullable:true, blank: true
		description		maxSize:128, nullable:true, blank: true
		assignTo		maxSize:128, nullable:true, blank: true
		memberOf		maxSize:128, nullable:true, blank: true
		campaign		maxSize:128, nullable:true, blank: true
		
		createdBy		nullable:true
		lastModifiedBy	nullable:true
		
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'patient_name_idx'
		
		sort 		name:'asc'
	}
}
