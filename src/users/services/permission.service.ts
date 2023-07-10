import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PERMISSION_LIST } from "../common/constant";
import { Permission } from "../entities/permission.entity";
import { GroupName } from "../enums/permission-groupname.enum";

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ) { }

    async seePermissions() {
        const permissions = PERMISSION_LIST;
        for (var i = 0; i < permissions.length; i++) {
            const permission = permissions[i];
            const dbPermission = await this.permissionRepository.findOne(
                {
                    where: {
                        deleted: false,
                        name: permission.name
                    }
                }
            );
            if (!dbPermission) {
                const savePayload = this.permissionRepository.create({ ...permission });
                await this.permissionRepository.save(savePayload);
            }
        }
    }

    async getPermissions() {
        return this.permissionRepository.find(
            {
                where: {
                    deleted: false
                }
            }
        )
    }
}