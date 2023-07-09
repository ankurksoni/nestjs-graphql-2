import { Field, ObjectType } from "@nestjs/graphql";
import { IdentityEntity } from "src/common/entities/identity-entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Permission } from "./permission.entity";

@Entity("cm_roles")
@ObjectType()
export class Role extends IdentityEntity {
    @Column({ name: 'name' })
    @Field()
    name: string;

    @Column({ name: 'display_name' })
    @Field()
    displayName: string;

    @Column({ name: 'description', type: 'text', nullable: true })
    @Field()
    description: string;

    @ManyToMany(type => Permission)
    @JoinTable({
        name: 'cm_roles_permissions',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    })
    permission: Permission[];
} 