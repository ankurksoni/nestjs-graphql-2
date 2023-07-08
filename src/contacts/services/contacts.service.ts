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

    async createContact({ phoneNumber }: ContactInput) { // destructured the object to single variable
        const record = await this.contactRepository.findOne({ where: { phoneNumber: phoneNumber } });

        if (record) {
            throw new GraphQLError('Contact exists.');
        }

        const newContact = new Contact();
        newContact.phoneNumber = phoneNumber;

        return this.contactRepository.save(newContact);
    }
}