import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { Repository } from "typeorm";
import { Permission } from "../entities/permission.entity";
import { Role } from "../entities/role.entity";
import { AssignPermissionsInput } from "../inputs/assign.permission.input";
import { RoleInput } from "../inputs/role.Input";
import { UpdateRoleInput } from "../inputs/update.role.input";

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>
    ) { }

    // create
    async createRole(roleInput: RoleInput) {
        const { name, description, displayName } = roleInput;
        const role = await this.roleRepository.findOne({
            where: {
                name,
                deleted: false
            }
        });
        if (role) {
            throw new GraphQLError(`${name} already exists.`);
        }
        const newRole = new Role();
        newRole.name = name;
        newRole.description = description;
        newRole.displayName = displayName;
        return this.roleRepository.save(newRole);
    }

    // update
    async updateRole(uuid: string, roleInput: UpdateRoleInput) {
        const { description, displayName } = roleInput;
        const role = await this.roleRepository.findOne({
            where: {
                uuid,
                deleted: false
            }
        });
        if (!role) {
            throw new GraphQLError(`Role with uuid:${uuid} does not exist.`);
        }
        role.description = description;
        role.displayName = displayName;
        return this.roleRepository.save(role);
    }

    // soft delete
    async deleteRole(uuid: string) {
        const role = await this.getRoleByUUID(uuid);
        if (!role) {
            throw new GraphQLError(`No role found to delete.`);
        }
        if (role && role.deleted) {
            throw new GraphQLError(`Role already deleted.`);
        }
        role.deleted = true;
        return this.roleRepository.save(role);
    }

    // get all
    async getAllRoles() {
        const role = await this.roleRepository.find({
            where: { deleted: false },
            take: 10,
            relations: ['permissions']
        });
        return role;
    }

    // get one
    async getRoleByUUID(uuid: string) {
        const role = await this.roleRepository.findOne({
            where: {
                uuid,
                deleted: false
            },
            relations: ['permissions']
        });
        return role;
    }

    // assign permission
    async assignPermissions({ roleUUID: uuid, permissionUUIDs }: AssignPermissionsInput) {
        const dbRole = await this.roleRepository.findOne({
            where: {
                deleted: false,
                uuid
            }
        })

        if (!dbRole) {
            throw new GraphQLError(`Role with UUID: ${uuid} does not exist.`);
        }

        const permissions: Permission[] = await this.validatePermissions(permissionUUIDs);
        if (permissions.length > 0) {
            await this.deleteRolePermissions(dbRole.id);

            dbRole.permissions = permissions;
        }

        return this.roleRepository.save(dbRole);
    }

    async validatePermissions(permissionUUIDs: string[]): Promise<Permission[]> {
        const permissions = permissionUUIDs.map(async ruuid => {
            const permission = await this.permissionRepository.findOne({
                where: {
                    uuid: ruuid,
                    deleted: false
                }
            });
            if (!permission) {
                throw new GraphQLError(`Permission: ${ruuid} not found.`);
            }
            return permission;
        });
        const mPermissions = await Promise.all(permissions);
        return mPermissions;
    }

    async deleteRolePermissions(id: number) {
        const data = await this.roleRepository.query(`DELETE FROM cm_roles_permissions WHERE role_id=${id}`);
        return data;
    }
}