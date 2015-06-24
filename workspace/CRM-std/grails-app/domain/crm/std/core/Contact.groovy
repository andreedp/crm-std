package crm.std.core

class Contact {

	String	id
	String name	
	String title
	String sex
	String address	
	String city	
	String state
	String postalCode
	String country
	Date dob
	String email
	String socialMedia
	Account account
	String department
	String position
	String telephone
	String telephone2
	String description
	SecAppUser assignTo
	String leadSource
	SecAppUser reportsTo
	Campaign campaign
	SecAppUser	createdBy
	SecAppUser	lastModifiedBy
	Date	dateCreated
	Date	lastUpdated
	
    static constraints = {
		id				maxSize:32
		name			maxSize:128
		sex				inList:['M','F','N']
		title			nullable: true, blank: true, inList:['Mr.','Ms.','Mrs.']
		address			maxSize:512, nullable:true, blank: true
		city			maxSize:128, nullable:true, blank: true
		state			maxSize:128, nullable:true, blank: true
		postalCode		maxSize:16, nullable:true, blank: true
		country			maxSize:128, nullable:true, blank: true
		email			maxSize:128, nullable:true, blank: true	
		socialMedia		maxSize:128, nullable:true, blank: true
		description		maxSize:512, nullable:true, blank: true
		telephone		maxSize:128, nullable:true, blank: true
		telephone2		maxSize:128, nullable:true, blank: true
		dob				nullable:true
		department		maxSize:128, nullable:true, blank: true
		position		maxSize:128, nullable:true, blank: true		
		leadSource		maxSize:128, nullable:true, blank: true
		account			nullable:true, blank: true
		assignTo		nullable:true, blank: true
		campaign		nullable:true, blank: true
		reportsTo		nullable:true, blank: true
		
		createdBy		nullable:true
		lastModifiedBy	nullable:true
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'contact_name_idx'
		
		sort 		name:'asc'
	}
}
