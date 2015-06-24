package crm.std.core

class Opportunity {

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
	
    static constraints = {
		id							maxSize:32
		name						maxSize:128
		opportunityAmount			nullable:true
		closeDate					nullable:true
		currency					maxSize:64, nullable:true, blank: true
		salesStage					maxSize:64, nullable:true, blank: true
		type						maxSize:64, nullable:true, blank: true
		probability					nullable:true
		leadSource					maxSize:64, nullable:true, blank: true
		nextStep					maxSize:64, nullable:true, blank: true
		description					maxSize:64, nullable:true, blank: true
		
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'opportunity_name_idx'
		
		sort 		name:'asc'
	}
}
