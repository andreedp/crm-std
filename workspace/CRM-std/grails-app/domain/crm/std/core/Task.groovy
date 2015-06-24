package crm.std.core

class Task {

    String name
	Account relatedTo
	Contact contact
	BigDecimal opportunityAmount
	Date startDate
	Date dueDate
	String priority
	String status
	String description
	SecAppUser assignTo
	
    static constraints = {
		id							maxSize:32
		name						maxSize:128
		startDate					nullable:true
		dueDate						nullable:true
		opportunityAmount			nullable:true
		priority					maxSize:64, nullable:true, blank: true
		status						maxSize:64, nullable:true, blank: true
		description					maxSize:64, nullable:true, blank: true
		
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'task_name_idx'
		
		sort 		name:'asc'
	}
}