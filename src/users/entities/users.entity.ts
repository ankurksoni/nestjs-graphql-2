import { Field, ObjectType } from "@nestjs/graphql";
import { IdentityEntity } from "src/common/entities/identity-entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { UserType } from "../enums/usertype.enum";
import { Role } from "./role.entity";

@Entity("cm_users")
@ObjectType()
export class User extends IdentityEntity {
    @Column({ name: 'full_name' })
    @Field()
    fullName: string;

    @Column({ name: 'username' })
    @Field()
    username: string;

    @Column({ name: 'email' })
    @Field()
    email: string;

    @Column({ name: 'password' })
    @Field()
    password: string;

    @Column({ name: 'user_type' })
    @Field( type => UserType)
    userType: UserType;

    @Column({ name: 'active', default: true })
    @Field()
    active: boolean;

    @ManyToMany(type => Role)
    @JoinTable({
        name: 'cm_user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id'},
    })
    @Field(type => [Role], {nullable: true})
    roles: Role[];
} 