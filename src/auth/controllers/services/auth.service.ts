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