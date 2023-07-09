import { Field, ObjectType } from "@nestjs/graphql";
import { IdentityEntity } from "src/common/entities/identity-entity";
import { Column, Entity } from "typeorm";
import { GroupName } from "../enums/permission-groupname.enum";

@Entity("cm_permission")
@ObjectType()
export class Permission extends IdentityEntity {
    @Column({ name: 'name' })
    @Field()
    name: string;

    @Column({ name: 'display_name' })
    @Field()
    displayName: string;

    @Column({ name: 'description', type: 'text', nullable: true })
    @Field()
    description: string;
    
    @Column({ name: 'group_name' })
    @Field()
    groupName: GroupName;
} 