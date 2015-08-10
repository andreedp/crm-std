package crm.std.core

import java.util.Date;

class Account implements Serializable {

	String	id
	String name
	String parent
	String company
	String website
	String officePhone
	String Fax
	String address
	String city
	String postalCode
	String country
	String email
	String type
	BigDecimal annualRevenue
	String industry
	String description
	SecAppUser assignTo
	Campaign campaign
	SecAppUser	createdBy
	SecAppUser	lastModifiedBy
	Date	dateCreated
	Date	lastUpdated
		
    static constraints = {
		id				maxSize:32
		name			maxSize:128
		parent			maxSize:128, nullable:true, blank: true		
		company			maxSize:128, nullable:true, blank: true
		address			maxSize:512, nullable:true, blank: true
		city			maxSize:128, nullable:true, blank: true
		postalCode		maxSize:128, nullable:true, blank: true
		country			maxSize:128, nullable:true, blank: true
		email			maxSize:128, nullable:true, blank: true
		description		maxSize:512, nullable:true, blank: true
		officePhone		maxSize:128, nullable:true, blank: true
		fax				maxSize:128, nullable:true, blank: true
		website			maxSize:128, nullable:true, blank: true
		type			maxSize:128, nullable:true, blank: true
		annualRevenue	nullable:true, blank: true
		industry		maxSize:128, nullable:true, blank: true, inList:['Technology', 'Banking', 'Communications', 'Consulting', 'Government']
		description		maxSize:128, nullable:true, blank: true
		assignTo		nullable:true, blank: true
		campaign		nullable:true, blank: true
		
		createdBy		nullable:true
		lastModifiedBy	nullable:true
		
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'account_name_idx'
		
		sort 		name:'asc'
	}
	
	Set<Task> getTasks(){
		return Task.findAllByAccount(this)
	}
}
