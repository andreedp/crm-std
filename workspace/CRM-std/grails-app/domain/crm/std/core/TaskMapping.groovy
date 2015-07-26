package crm.std.core

import java.util.Date;

class TaskMapping {

	String	id
	String name
	SecAppUser	createdBy
	SecAppUser	lastModifiedBy
	Date	dateCreated
	Date	lastUpdated
	
    static constraints = {
		id							maxSize:32
		name						maxSize:128
		
		createdBy					nullable:true
		lastModifiedBy				nullable:true
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'task_name_idx'
		
		sort 		name:'asc'
	}
}
