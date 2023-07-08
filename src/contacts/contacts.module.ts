import { Module } from '@nestjs/common';
import ContactsResolver from './resolvers/contacts.resolver';
import { ContactsService } from './services/contacts.service';

@Module({
    providers: [
        ContactsService,
        ContactsResolver
    ]
})
export class ContactsModule { }
