package crm.std.core

class Opportunity {

	String	id
	String name
	Account account
	String currency
	BigDecimal opportunityAmount
	Date closeDate
	String salesStage
	String type
	BigDecimal probability
	String leadSource
	String nextStep
	String description
	SecAppUser assignTo
	Campaign campaign
	SecAppUser	createdBy
	SecAppUser	lastModifiedBy
	Date	dateCreated
	Date	lastUpdated
	
    static constraints = {
		id							maxSize:32
		name						maxSize:128
		account						nullable:true
		opportunityAmount			nullable:true
		closeDate					nullable:true
		currency					maxSize:64, nullable:true, blank: true
		salesStage					maxSize:64, nullable:true, blank: true, inList:['Prospecting', 'Qualification', 'Negotiation', 'Closed Won', 'Closed Lost']
		type						maxSize:64, nullable:true, blank: true
		probability					nullable:true
		leadSource					maxSize:64, nullable:true, blank: true
		nextStep					maxSize:64, nullable:true, blank: true
		description					maxSize:64, nullable:true, blank: true
		assignTo					nullable:true, blank: true
		campaign					nullable:true, blank: true
		
		createdBy					nullable:true
		lastModifiedBy				nullable:true
		
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'opportunity_name_idx'
		
		sort 		name:'asc'
	}
}
