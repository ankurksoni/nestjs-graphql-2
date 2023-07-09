import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ])
    ],
    providers: [UserService, UserResolver]
})

export class UsersModule { }
