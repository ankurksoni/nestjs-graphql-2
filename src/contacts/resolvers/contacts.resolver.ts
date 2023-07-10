import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphqlAuthGuard } from "src/auth/guards/graphql.guard";
import { PermissionGuard } from "src/auth/guards/permission.guard";
import { HasPermission } from "src/users/decorator/has.permission.decorator";
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
    @UseGuards(GraphqlAuthGuard, PermissionGuard)
    @HasPermission('VIEW_CONTACTS')
    getAllContacts() {
        return this.contactService.getAllContacts();
    }

    @Query(returns => Contact)
    @UseGuards(GraphqlAuthGuard, PermissionGuard)
    @HasPermission('VIEW_SINGLE_CONTACT')
    getSingleContact(@Args('uuid') uuid: string) {
        return this.contactService.getSingleContact(uuid);
    }

    @Mutation(returns => Contact)
    @UseGuards(GraphqlAuthGuard, PermissionGuard)
    @HasPermission('CREATE_CONTACT')
    async createContact(
        @Args('contactInput') contactInput: ContactInput
    ) {
        return this.contactService.createContact(contactInput);
    }

    @Mutation(returns => Contact)
    @UseGuards(GraphqlAuthGuard, PermissionGuard)
    @HasPermission('UPDATE_CONTACT')
    async updateContact(
        @Args('uuid') uuid: string,
        @Args('contactInput') contactInput: ContactInput
    ) {
        return this.contactService.updateContact(uuid, contactInput);
    }

    @Mutation(returns => Contact)
    @UseGuards(GraphqlAuthGuard, PermissionGuard)
    @HasPermission('MAKE_CONTACT_PUBLIC')
    async makeContactPublic(
        @Args('uuid') uuid: string
    ) {
        return this.contactService.makeContactPublic(uuid);
    }

    @Mutation(returns => Contact)
    @UseGuards(GraphqlAuthGuard, PermissionGuard)
    @HasPermission('DELETE_CONTACT')
    async deleteContact(
        @Args('uuid') uuid: string
    ) {
        return this.contactService.deleteContact(uuid);
    }
}
