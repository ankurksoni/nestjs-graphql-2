import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthService } from "../controllers/services/auth.service";


@Injectable()
export class PermissionGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const { user } = ctx.getContext().req;
        if (!user) {
            throw new UnauthorizedException(`Invalid User`);
        }
        const methodPermissionName = this.reflector.get<string>('permission', context.getHandler());
        const classPermissionName = this.reflector.get<string>('permission', context.getClass());
        const allowedPermissions = await this.authService.getUserPermissions(user.username);
        if (methodPermissionName) {
            if (allowedPermissions.includes(methodPermissionName)) {
                return true;
            } else {
                throw new ForbiddenException(`User not authorized for this action.`)
            }
        }
        if (classPermissionName) {
            if (allowedPermissions.includes(classPermissionName)) {
                return true;
            } else {
                throw new ForbiddenException(`User not authorized for this action.`)
            }
        }

    }

}