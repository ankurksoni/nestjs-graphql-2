import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { hasSamePasswords } from "src/common/utils";
import { User } from "src/users/entities/users.entity";
import { Repository } from "typeorm";
import { LoginDTO } from "../dtos/login.dto";


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async getUserPermissions(username: string): Promise<string[]> {
        const query = `
            SELECT pm.name FROM cm_users u
            INNER JOIN cm_user_roles ru       ON ru.user_id = u.id
            INNER JOIN cm_roles_permissions pr ON pr.role_id=ru.role_id
            INNER JOIN cm_permission pm      ON pm.id=pr.permission_id
            WHERE u.username='${username}' 
            GROUP BY pm.name, u.username
        `;
        const permissions = await this.userRepository.query(query);
        const permissionNames = permissions.map(p => p.name);
        return permissionNames;
    }

    async login({ username, password }: LoginDTO) {
        const user = await this.userRepository.findOne({ where: { username } });
        const isPasswordMatching = await hasSamePasswords(password, user.password);
        if (!user || !user.active || !isPasswordMatching) {
            throw new UnauthorizedException();
        }
        delete user.password;
        const payload = { user: user.uuid };
        const jwtToken = await this.jwtService.signAsync(payload);
        return {
            access_token: jwtToken
        };
    }

    async getUserFromJwtPayload(uuid: string) {
        return this.userRepository.findOne({ where: { uuid, deleted: false } });
    }
}