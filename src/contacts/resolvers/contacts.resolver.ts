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

    @Query(returns => [Contact])
    getAllContacts() {
        return this.contactService.getAllContacts();
    }

    @Query(returns => Contact)
    getSingleContact(@Args('uuid') uuid: string) {
        return this.contactService.getSingleContact(uuid);
    }

    @Mutation(returns => Contact)
    async createContact(
        @Args('contactInput') contactInput: ContactInput
    ) {
        return this.contactService.createContact(contactInput);
    }

    @Mutation(returns => Contact)
    async updateContact(
        @Args('uuid') uuid: string,
        @Args('contactInput') contactInput: ContactInput
    ) {
        return this.contactService.updateContact(uuid, contactInput);
    }

    @Mutation(returns => Contact)
    async makeContactPublic(
        @Args('uuid') uuid: string
    ) {
        return this.contactService.makeContactPublic(uuid);
    }

    @Mutation(returns => Contact)
    async deleteContact(
        @Args('uuid') uuid: string
    ) {
        return this.contactService.deleteContact(uuid);
    }
}