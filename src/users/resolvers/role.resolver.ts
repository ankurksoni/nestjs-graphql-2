import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphqlAuthGuard } from "src/auth/guards/graphql.guard";
import { PermissionGuard } from "src/auth/guards/permission.guard";
import { HasPermission } from "../decorator/has.permission.decorator";
import { Role } from "../entities/role.entity";
import { AssignPermissionsInput } from "../inputs/assign.permission.input";
import { RoleInput } from "../inputs/role.Input";
import { UpdateRoleInput } from "../inputs/update.role.input";
import { RoleService } from "../services/role.service";

@Resolver(of => Role)
@UseGuards(GraphqlAuthGuard, PermissionGuard)
@HasPermission('VIEW_ROLE')
export class RoleResolver {

    constructor(private roleService: RoleService) { }

    @Query(returns => [Role], { nullable: true })
    getAllRoles() {
        return this.roleService.getAllRoles();
    }

    @Query(returns => Role, { nullable: true })
    getRoleByUUID(
        @Args('uuid')
        uuid: string
    ) {
        return this.roleService.getRoleByUUID(uuid);
    }

    @Mutation(returns => Role)
    @HasPermission('CREATE_ROLE')
    createRole(
        @Args('roleInput')
        roleInput: RoleInput
    ) {
        return this.roleService.createRole(roleInput);
    }

    @Mutation(returns => Role)
    @HasPermission('UPDATE_ROLE')
    updateRole(
        @Args('uuid')
        uuid: string,
        @Args('updateRoleInput')
        updateRoleInput: UpdateRoleInput
    ) {
        return this.roleService.updateRole(uuid, updateRoleInput);
    }

    @Mutation(returns => Role)
    @HasPermission('DELETE_ROLE')
    deleteRole(
        @Args('uuid')
        uuid: string
    ) {
        return this.roleService.deleteRole(uuid);
    }

    @Mutation(returns => Role)
    @HasPermission('ASSIGN_ROLE')
    assignPermissions(
        @Args('assignPermissionsInput')
        assignPermissionsInput: AssignPermissionsInput
    ) {
        return this.roleService.assignPermissions(assignPermissionsInput);
    }
}