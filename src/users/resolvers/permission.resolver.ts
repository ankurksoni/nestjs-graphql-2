import { Query, Resolver } from "@nestjs/graphql";
import { Permission } from "../entities/permission.entity";
import { PermissionService } from "../services/permission.service";

@Resolver(of => Permission)
export class PermissionResolver {

    constructor(private readonly permissionService: PermissionService) {}

    @Query(returns => [Permission])
    getPermissions() {
        return this.permissionService.getPermissions()
    }
}