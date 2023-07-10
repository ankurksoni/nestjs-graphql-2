import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Role } from "../entities/role.entity";
import { AssignPermissionsInput } from "../inputs/assign.permission.input";
import { RoleInput } from "../inputs/role.Input";
import { UpdateRoleInput } from "../inputs/update.role.input";
import { RoleService } from "../services/role.service";

@Resolver(of => Role)
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
    createRole(
        @Args('roleInput')
        roleInput: RoleInput
    ) {
        return this.roleService.createRole(roleInput);
    }

    @Mutation(returns => Role)
    updateRole(
        @Args('uuid')
        uuid: string,
        @Args('updateRoleInput')
        updateRoleInput: UpdateRoleInput
    ) {
        return this.roleService.updateRole(uuid, updateRoleInput);
    }

    @Mutation(returns => Role)
    deleteRole(
        @Args('uuid')
        uuid: string
    ) {
        return this.roleService.deleteRole(uuid);
    }

    @Mutation(returns => Role)
    assignPermissions(
        @Args('assignPermissionsInput')
        assignPermissionsInput: AssignPermissionsInput
    ) {
        return this.roleService.assignPermissions(assignPermissionsInput);
    }
}