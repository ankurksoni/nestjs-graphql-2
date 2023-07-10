import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './controllers/services/auth.service';
import { jwtConstants } from '../common/constant';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GraphqlAuthGuard } from './guards/graphql.guard';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '60m'
            }
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        JwtStrategy,
        JwtAuthGuard,
        GraphqlAuthGuard,
    ],
    exports: [AuthService]
})
export class AuthModule { }
