import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Contact } from "../entities/contacts.entity";
import { ContactInput } from "../inputs/contact.input";
import { ContactsService } from "../services/contacts.service";

@Resolver(of => Contact)
export default class ContactResolver {
    constructor(private contactService: ContactsService) { }

    @Query(returns => [Contact])
    getPublicContacts() {
        return this.contactService.getPublicContacts();
    }


    @Mutation(returns => Contact)
    async createContact(
        @Args('contactInput') contactInput: ContactInput
    ) {
        return this.contactService.createContact(contactInput);
    }
}