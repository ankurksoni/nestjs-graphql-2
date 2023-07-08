import { Query, Resolver } from "@nestjs/graphql";
import { Contact } from "../entities/contacts.entity";
import { ContactsService } from "../services/contacts.service";

@Resolver(of => Contact)
export default class ContactResolver {
    constructor(private contactService: ContactsService) { }

    @Query(returns => [Contact])
    getPublicContacts() {
        return this.contactService.getPublicContacts();
     }
}