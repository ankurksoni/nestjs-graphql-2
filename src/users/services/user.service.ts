import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { hashIt, hasSamePasswords } from "src/common/utils";
import { Repository } from "typeorm";
import { User } from "../entities/users.entity";
import { UpdateUserInput } from "../inputs/update.user.input";
import { UserInput } from "../inputs/user.input";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) {

    }

    async getUserByUUID(uuid: string) {
        const user = await this.userRepository.findOne({
            where: {
                uuid,
                deleted: false
            }
        });
        return user;
    }

    private async getDeletedUserByUUID(uuid: string) {
        const user = await this.userRepository.findOne({
            where: {
                uuid,
                deleted: true
            }
        });
        return user;
    }

    async createUser(userInput: UserInput) {
        const { fullName, email, userType, username, password, confirmPassword } = userInput;
        const user = await this.userRepository.findOne({
            where: {
                username,
                deleted: false
            }
        });
        if (user) {
            throw new GraphQLError(`${username} already exists.`);
        } else if (password !== confirmPassword) {
            throw new GraphQLError(`password and confirm password do not match.`);
        }
        const newUser = new User();
        newUser.fullName = fullName;
        newUser.email = email;
        newUser.username = username;
        newUser.password = await hashIt(password);
        newUser.userType = userType;
        return this.userRepository.save(newUser);
    }

    async updateUser(uuid: string, userInput: UpdateUserInput) {
        const { fullName, email } = userInput;
        const user = await this.getUserByUUID(uuid);
        if (!user) {
            throw new GraphQLError(`User does not exists.`);
        }

        user.fullName = fullName;
        user.email = email;
        return this.userRepository.save(user);
    }

    async changeUserPassword(uuid: string, oldPassword: string, newPassword: string, confirmNewPassword: string) {
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            throw new GraphQLError(`Password provided in invalid format.`);
        } else if (newPassword !== confirmNewPassword) {
            throw new GraphQLError(`new and confirm password mismatch.`);
        } else if (newPassword === oldPassword) {
            throw new GraphQLError(`new and old password must not match.`);
        }

        const user = await this.getUserByUUID(uuid);
        if (!user) {
            throw new GraphQLError(`User does not exists.`);
        }

        const isOldPasswordCorrect = await hasSamePasswords(oldPassword, user.password);
        if (!isOldPasswordCorrect) {
            throw new GraphQLError(`old password is incorrect.`);
        }
        
        const isNewPassMatchingOldPass = await hasSamePasswords(newPassword, user.password);
        if (isNewPassMatchingOldPass) {
            throw new GraphQLError(`password must not match old password.`);
        }
        user.password = await hashIt(newPassword);
        return this.userRepository.save(user);
    }

    async activateUser(uuid: string) {
        const user = await this.getUserByUUID(uuid);
        if (!user) {
            throw new GraphQLError(`No User found to activate.`);
        }

        if (user && user.active) {
            throw new GraphQLError(`User already activated.`);
        }
        user.active = true;
        return this.userRepository.save(user);
    }

    async blockUser(uuid: string) {
        const user = await this.getUserByUUID(uuid);
        if (!user) {
            throw new GraphQLError(`No User found to block.`);
        }

        if (user && !user.active) {
            throw new GraphQLError(`User already blocked.`);
        }
        user.active = false;
        return this.userRepository.save(user);
    }

    async deleteUser(uuid: string) {
        const user = await this.getUserByUUID(uuid);
        if (!user) {
            throw new GraphQLError(`No User found to delete.`);
        }
        if (user && user.deleted) {
            throw new GraphQLError(`User already deleted.`);
        }
        user.deleted = true;
        return this.userRepository.save(user);
    }

    async restoreUser(uuid: string) {
        const user = await this.getDeletedUserByUUID(uuid);
        if (!user) {
            throw new GraphQLError(`No User found to restore.`);
        }
        user.deleted = false;
        return this.userRepository.save(user);
    }
}