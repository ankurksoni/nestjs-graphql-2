import { SetMetadata } from "@nestjs/common"

export const HasPermission = (permissionName: string) => {
    return SetMetadata('permission', permissionName)
}