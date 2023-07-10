import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Contact } from './entities/contacts.entity';
import ContactsResolver from './resolvers/contacts.resolver';
import { ContactsService } from './services/contacts.service';

@Module({
    imports: [
        AuthModule,
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
