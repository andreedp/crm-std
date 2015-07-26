package crm.std.core

import java.util.Date;

class Task {

	String	id
    String name
	TaskMapping relatedTo
	Contact contact
	Date startDate
	Date dueDate
	String priority
	String status
	String description
	SecAppUser assignTo
	SecAppUser	createdBy
	SecAppUser	lastModifiedBy
	Date	dateCreated
	Date	lastUpdated
	
    static constraints = {
		id							maxSize:32
		name						maxSize:128
		startDate					nullable:true
		dueDate						nullable:true
		priority					maxSize:64, nullable:true, blank: true
		status						maxSize:64, nullable:true, blank: true
		description					maxSize:64, nullable:true, blank: true
		
		createdBy					nullable:true
		lastModifiedBy				nullable:true
		
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'task_name_idx'
		
		sort 		name:'asc'
	}
}
