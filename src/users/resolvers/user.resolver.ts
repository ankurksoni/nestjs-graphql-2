import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphqlAuthGuard } from "src/auth/guards/graphql.guard";
import { PermissionGuard } from "src/auth/guards/permission.guard";
import { HasPermission } from "../decorator/has.permission.decorator";
import { User } from "../entities/users.entity";
import { AssignRolesInput } from "../inputs/assign.roles.input";
import { UpdateUserInput } from "../inputs/update.user.input";
import { UserInput } from "../inputs/user.input";
import { UserService } from "../services/user.service";

@Resolver(of => User)
@UseGuards(GraphqlAuthGuard, PermissionGuard)
export class UserResolver {

    constructor(private userService: UserService) { }

    @Query(returns => User)
    @HasPermission('VIEW_USER')
    getUser(
        @Args('uuid')
        uuid: string
    ) {
        return this.userService.getUserByUUID(uuid);
    }

    @Query(returns => [User])
    @HasPermission('VIEW_USERS')
    getUsers() {
        return this.userService.getUsers();
    }

    @Mutation(returns => User)
    @HasPermission('CREATE_USER')
    createUser(
        @Args('userInput')
        userInput: UserInput
    ) {
        return this.userService.createUser(userInput);
    }

    @Mutation(returns => User)
    @HasPermission('UPDATE_USER')
    updateUser(
        @Args('uuid')
        uuid: string,
        @Args('userInput')
        userInput: UpdateUserInput
    ) {
        return this.userService.updateUser(uuid, userInput);
    }

    @Mutation(returns => User)
    @HasPermission('ACTIVATE_USER')
    activateUser(
        @Args('uuid')
        uuid: string
    ) {
        return this.userService.activateUser(uuid);
    }

    @Mutation(returns => User)
    @HasPermission('BLOCK_USER')
    blockUser(
        @Args('uuid')
        uuid: string
    ) {
        return this.userService.blockUser(uuid);
    }

    @Mutation(returns => User)
    @HasPermission('DELETE_USER')
    deleteUser(
        @Args('uuid')
        uuid: string
    ) {
        return this.userService.deleteUser(uuid);
    }

    @Mutation(returns => User)
    @HasPermission('RESTORE_USER')
    restoreUser(
        @Args('uuid')
        uuid: string
    ) {
        return this.userService.restoreUser(uuid);
    }

    @Mutation(returns => User)
    @HasPermission('CHANGE_PASSWORD')
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

    @Mutation(returns => User)
    @HasPermission('ASSIGN_USER_ROLE')
    assignRoles(
        @Args('assignRolesInput')
        assignRolesInput: AssignRolesInput
    ) {
        return this.userService.assignRoles(assignRolesInput)
    }
}