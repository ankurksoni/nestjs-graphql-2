import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { Repository } from "typeorm";
import { Contact } from "../entities/contacts.entity";
import { ContactInput } from "../inputs/contact.input";

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>
    ) {
    }

    getPublicContacts() {
        return this.contactRepository.find();
    }

    getAllContacts() {
        return this.contactRepository.find({ where: { deleted: false } });
    }

    async getSingleContact(uuid: string) {
        const dbContact = await this.contactRepository.findOne({ where: { uuid: uuid, deleted: false } });
        if (dbContact) {
            return dbContact;
        }
        throw new GraphQLError(`Contact with UUID: ${uuid} not found.`);
    }

    async createContact({ phoneNumber }: ContactInput) { // destructured the object to single variable
        const record = await this.contactRepository.findOne({ where: { phoneNumber, deleted: false } });

        if (record) {
            throw new GraphQLError('Contact exists.');
        }

        const newContact = new Contact();
        newContact.phoneNumber = phoneNumber;

        return this.contactRepository.save(newContact);
    }

    async updateContact(uuid: string, { phoneNumber }: ContactInput) {
        const existingContact = await this.getSingleContact(uuid);
        if (!existingContact) {
            throw new GraphQLError('Contact should exist for an update.');
        }
        existingContact.phoneNumber = phoneNumber;
        return this.contactRepository.save(existingContact);
    }

    async makeContactPublic(uuid: string) {
        const existingContact = await this.getSingleContact(uuid);
        if (!existingContact) {
            throw new GraphQLError('Contact should exist for an update.');
        } else if (existingContact.isPublic) {
            throw new GraphQLError('Contact already public.');
        }
        existingContact.isPublic = true;
        return this.contactRepository.save(existingContact);
    }

    async deleteContact(uuid: string) {
        const existingContact = await this.getSingleContact(uuid);
        if (!existingContact) {
            throw new GraphQLError('Contact should exist for delete operation.');
        }
        existingContact.deleted = true;
        return this.contactRepository.save(existingContact);
    }
}