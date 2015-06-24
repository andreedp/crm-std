package crm.std.core

class Campaign {

    String name
	Account account
	String currency
	BigDecimal budget
	BigDecimal actualCost
	BigDecimal expectedCost
	BigDecimal expectedRevenue
	String objective
	Date startDate	
	Date endDate
	String status
	String type
	BigDecimal probability
	String description
	SecAppUser assignTo
	
    static constraints = {
		id							maxSize:32
		name						maxSize:128
		budget						nullable:true
		actualCost					nullable:true
		expectedCost				nullable:true
		expectedRevenue				nullable:true
		startDate					nullable:true
		endDate						nullable:true
		currency					maxSize:64, nullable:true, blank: true
		status						maxSize:64, nullable:true, blank: true
		type						maxSize:64, nullable:true, blank: true
		description					maxSize:64, nullable:true, blank: true
		
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'campaign_name_idx'
		
		sort 		name:'asc'
	}
}