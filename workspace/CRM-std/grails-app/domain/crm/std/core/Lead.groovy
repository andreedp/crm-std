package crm.std.core

class Lead {

	String name
	String title
	String sex
	String address	
	String city	
	String state
	String postalCode
	String country
	String email
	String socialMedia
	String company
	String department
	BigDecimal budget
	String status
	String notes
	String leadSource
	String nextStep
	String description
	SecAppUser assignTo
	Campaign campaign
	
    static constraints = {
		id							maxSize:32
		name						maxSize:128
		sex							inList:['M','F','N']
		title						nullable: true, blank: true, inList:['Mr.','Ms.','Mrs.']
		address						maxSize:512, nullable:true, blank: true
		city						maxSize:128, nullable:true, blank: true
		state						maxSize:128, nullable:true, blank: true
		postalCode					maxSize:16, nullable:true, blank: true
		country						maxSize:128, nullable:true, blank: true
		email						maxSize:128, nullable:true, blank: true
		socialMedia					maxSize:128, nullable:true, blank: true
		status						maxSize:64, nullable:true, blank: true
		notes						maxSize:64, nullable:true, blank: true
		leadSource					maxSize:64, nullable:true, blank: true
		nextStep					maxSize:64, nullable:true, blank: true
		description					maxSize:64, nullable:true, blank: true
	}
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'lead_name_idx'
		
		sort 		name:'asc'
	} 
}
