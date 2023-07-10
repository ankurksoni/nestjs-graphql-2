import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/users.entity';
import { PermissionResolver } from './resolvers/permission.resolver';
import { RoleResolver } from './resolvers/role.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { PermissionService } from './services/permission.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            User,
            Role,
            Permission
        ])
    ],
    providers: [UserService, UserResolver, RoleResolver, RoleService, PermissionService, PermissionResolver]
})

export class UsersModule implements OnModuleInit {
    constructor(
        private permissionService: PermissionService
    ) { }


    async onModuleInit() {
        await this.permissionService.seePermissions();
    }
}
