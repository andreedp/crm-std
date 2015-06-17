package crm.std.core

import crm.std.core.Contact
import grails.transaction.Transactional

@Transactional
class ContactService extends BaseService{
	
	Contact save(Contact contact){
		contact.save(flush:true, failOnError: true);
	}

    List<Contact> list() {
        return Contact.list();
    }

    Contact get(long contactId) {
        return Contact.get(contactId);
    }

    void delete(Contact contact){
        contact.delete()
    }
}
