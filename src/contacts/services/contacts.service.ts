import { Injectable } from "@nestjs/common";
import { Contact } from "../entities/contacts.entity";

@Injectable()
export class ContactsService {

    private fakeContacts: Contact[] = [
        {
            phoneNumber: "123123213",
            id: 1,
            isPublic: true
        }
    ]

    getPublicContacts() {
        return this.fakeContacts;
    }
}