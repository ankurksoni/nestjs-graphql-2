import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contact } from "../entities/contacts.entity";

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
}