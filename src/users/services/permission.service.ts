import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission } from "../entities/permission.entity";
import { GroupName } from "../enums/permission-groupname.enum";

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ) { }

    async seePermissions() {
        const permissions = [
            {
                name: "CREATE_CONTACT",
                description: "CREATE_CONTACT",
                displayName: "CREATE_CONTACT",
                groupName: GroupName.CONTACTS
            },
            {
                name: "VIEW_CONTACTS",
                description: "VIEW_CONTACTS",
                displayName: "VIEW_CONTACTS",
                groupName: GroupName.CONTACTS
            },
            {
                name: "VIEW_SINGLE_CONTACT",
                description: "VIEW_SINGLE_CONTACT",
                displayName: "VIEW_SINGLE_CONTACT",
                groupName: GroupName.CONTACTS
            },
            {
                name: "UPDATE_CONTACT",
                description: "UPDATE_CONTACT",
                displayName: "UPDATE_CONTACT",
                groupName: GroupName.CONTACTS
            },
            {
                name: "MAKE_CONTACT_PUBLIC",
                description: "MAKE_CONTACT_PUBLIC",
                displayName: "MAKE_CONTACT_PUBLIC",
                groupName: GroupName.CONTACTS
            },
            {
                name: "DELETE_CONTACT",
                description: "DELETE_CONTACT",
                displayName: "DELETE_CONTACT",
                groupName: GroupName.CONTACTS
            },
            {
                name: "VIEW_PERMISSIONS",
                description: "VIEW_PERMISSIONS",
                displayName: "VIEW_PERMISSIONS",
                groupName: GroupName.UAA
            },
            {
                name: "VIEW_ROLE",
                description: "VIEW_ROLE",
                displayName: "VIEW_ROLE",
                groupName: GroupName.UAA
            },
            {
                name: "CREATE_ROLE",
                description: "CREATE_ROLE",
                displayName: "CREATE_ROLE",
                groupName: GroupName.UAA
            },
            {
                name: "UPDATE_ROLE",
                description: "UPDATE_ROLE",
                displayName: "UPDATE_ROLE",
                groupName: GroupName.UAA
            },
            {
                name: "DELETE_ROLE",
                description: "DELETE_ROLE",
                displayName: "DELETE_ROLE",
                groupName: GroupName.UAA
            },
            {
                name: "ASSIGN_ROLE",
                description: "ASSIGN_ROLE",
                displayName: "ASSIGN_ROLE",
                groupName: GroupName.UAA
            }
        ];
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