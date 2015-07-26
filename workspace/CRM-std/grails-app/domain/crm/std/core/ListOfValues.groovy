package crm.std.core

import java.util.Date;

class ListOfValues {

    String	id
	String valueType
	String valueName
	SecAppUser	createdBy
	SecAppUser	lastModifiedBy
	Date	dateCreated
	Date	lastUpdated
	
    static constraints = {
		id							maxSize:32
		valueType						maxSize:128
		valueName						maxSize:128
		
		createdBy					nullable:true
		lastModifiedBy				nullable:true
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'task_name_idx'
		
		sort 		name:'asc'
	}
}
