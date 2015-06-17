package crm.std.core
import grails.rest.*

class Contact {

	String	id
	String name
	String title
	String sex
	String address
	Date dob
	String email
	String account
	String department
	String telephone
	String telephone2
	String description
	String assignTo
	String leadSource
	String reportsTo
	String campaign
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
		email			maxSize:128, nullable:true, blank: true
		description		maxSize:512, nullable:true, blank: true
		telephone		maxSize:128, nullable:true, blank: true
		telephone2		maxSize:128, nullable:true, blank: true
		dob				nullable:true
		account			maxSize:128, nullable:true, blank: true		
		department		maxSize:128, nullable:true, blank: true
		assignTo		maxSize:128, nullable:true, blank: true		
		leadSource		maxSize:128, nullable:true, blank: true
		reportsTo		maxSize:128, nullable:true, blank: true		
		campaign		maxSize:128, nullable:true, blank: true
		
		createdBy		nullable:true
		lastModifiedBy	nullable:true
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'patient_name_idx'
		address		index:'patient_address_idx'
		contact		index:'patient_contact_idx'
		
		sort 		name:'asc'
	}
}
