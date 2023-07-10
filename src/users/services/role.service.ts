import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { Repository } from "typeorm";
import { Role } from "../entities/role.entity";
import { RoleInput } from "../inputs/role.Input";
import { UpdateRoleInput } from "../inputs/update.role.input";

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
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
            take: 10
        });
        return role;
    }

    // get one
    async getRoleByUUID(uuid: string) {
        const role = await this.roleRepository.findOne({
            where: {
                uuid,
                deleted: false
            }
        });
        return role;
    }

    // assign permission
}