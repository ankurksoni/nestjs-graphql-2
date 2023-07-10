import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "../entities/users.entity";
import { UpdateUserInput } from "../inputs/update.user.input";
import { UserInput } from "../inputs/user.input";
import { UserService } from "../services/user.service";


@Resolver(of => User)
export class UserResolver {

    constructor(private userService: UserService) {    }

    @Query(returns => User)
    getUser(
        @Args('uuid')
        uuid: string
    ) {
        return this.userService.getUserByUUID(uuid);
    }

    @Mutation(returns => User)
    createUser(
        @Args('userInput')
        userInput: UserInput
    ) {
        return this.userService.createUser(userInput);
    }

    @Mutation(returns => User)
    updateUser(
        @Args('uuid')
        uuid: string,
        @Args('userInput')
        userInput: UpdateUserInput
    ) {
        return this.userService.updateUser(uuid, userInput);
    }

    @Mutation(returns => User)
    activateUser(
        @Args('uuid')
        uuid: string
    ) {
        return this.userService.activateUser(uuid);
    }

    @Mutation(returns => User)
    blockUser(
        @Args('uuid')
        uuid: string
    ) {
        return this.userService.blockUser(uuid);
    }

    @Mutation(returns => User)
    deleteUser(
        @Args('uuid')
        uuid: string
    ) {
        return this.userService.deleteUser(uuid);
    }

    @Mutation(returns => User)
    restoreUser(
        @Args('uuid')
        uuid: string
    ) {
        return this.userService.restoreUser(uuid);
    }

    @Mutation(returns => User)
    changeUserPassword(
        @Args('uuid')
        uuid: string,
        @Args('oldPassword')
        oldPassword: string,
        @Args('newPassword')
        newPassword: string,
        @Args('confirmNewPassword')
        confirmNewPassword: string,
    ) {
        return this.userService.changeUserPassword(uuid, oldPassword, newPassword, confirmNewPassword);
    }
}