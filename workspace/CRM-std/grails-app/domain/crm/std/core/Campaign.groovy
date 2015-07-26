package crm.std.core

import java.util.Date;

class Campaign {

    String name
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
	String description
	SecAppUser assignTo
	SecAppUser	createdBy
	SecAppUser	lastModifiedBy
	Date	dateCreated
	Date	lastUpdated
	
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
		assignTo					nullable:true, blank: true
		
		createdBy					nullable:true
		lastModifiedBy				nullable:true
		
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'campaign_name_idx'
		
		sort 		name:'asc'
	}
}
