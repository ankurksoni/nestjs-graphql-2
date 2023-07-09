import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './controllers/services/auth.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }
