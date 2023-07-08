import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contacts.entity';
import ContactsResolver from './resolvers/contacts.resolver';
import { ContactsService } from './services/contacts.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Contact
        ])
    ],
    providers: [
        ContactsService,
        ContactsResolver
    ]
})
export class ContactsModule { }
