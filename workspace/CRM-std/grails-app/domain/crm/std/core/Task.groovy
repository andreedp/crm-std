package crm.std.core

import java.io.Serializable;
import java.util.Date;

class Task implements Serializable {

	String	id
    String name
	String relatedTo
	Contact contactName
	Date startDate
	Date dueDate
	String priority
	String status
	String description
	Lead lead
	Account account
	Opportunity opportunity
	Contact contact	
	Campaign campaign
	SecAppUser assignTo
	SecAppUser	createdBy
	SecAppUser	lastModifiedBy
	Date	dateCreated
	Date	lastUpdated

    static constraints = {
		id							maxSize:32
		name						maxSize:128
		startDate					nullable:true, blank: true
		dueDate						nullable:true, blank: true
		priority					maxSize:64, nullable:true, blank: true
		status						maxSize:64, nullable:true, blank: true
		description					maxSize:64, nullable:true, blank: true
		lead						nullable:true, blank: true
		account						nullable:true, blank: true
		opportunity					nullable:true, blank: true
		contact						nullable:true, blank: true		
		contactName					nullable:true, blank: true
		campaign					nullable:true, blank: true
		assignTo					nullable:true, blank: true
		
		createdBy					nullable:true
		lastModifiedBy				nullable:true
		
    }
	
	static mapping = {
		id			name:'id',generator:'uuid'
		name 		index:'task_name_idx'
		
		sort 		name:'asc'
	}
}
