import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hashIt, hasSamePasswords } from "src/common/utils";
import { User } from "src/users/entities/users.entity";
import { Repository } from "typeorm";
import { LoginDTO } from "../dtos/login.dto";


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async login({ username, password }: LoginDTO) {
        const user = await this.userRepository.findOne({ where: { username } });
        const isPasswordMatching = await hasSamePasswords(password, user.password);
        if (!user || !user.active || !isPasswordMatching) {
            throw new UnauthorizedException();
        }
        delete user.password;
        return user;
    }
}