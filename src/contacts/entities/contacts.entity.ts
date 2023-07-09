import { Field, ObjectType } from "@nestjs/graphql";
import { IdentityEntity } from "src/common/entities/identity-entity";
import { Column, Entity, Generated, Index, PrimaryGeneratedColumn } from "typeorm";


@Entity("cm_contacts")
@ObjectType()
export class Contact extends IdentityEntity {
    @Column({ name: 'phone_number' })
    @Field()
    phoneNumber: string;

    @Column({ name: 'is-public', default: false })
    @Field()
    isPublic: boolean;
} 