import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { GraphqlAuthGuard } from "src/auth/guards/graphql.guard";
import { PermissionGuard } from "src/auth/guards/permission.guard";
import { HasPermission } from "../decorator/has.permission.decorator";
import { Permission } from "../entities/permission.entity";
import { PermissionService } from "../services/permission.service";

@Resolver(of => Permission)
@UseGuards(GraphqlAuthGuard, PermissionGuard)
@HasPermission('VIEW_PERMISSIONS')
export class PermissionResolver {

    constructor(private readonly permissionService: PermissionService) { }

    @Query(returns => [Permission])
    getPermissions() {
        return this.permissionService.getPermissions()
    }
}