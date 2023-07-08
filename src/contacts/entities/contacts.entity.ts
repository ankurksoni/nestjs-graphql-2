import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Generated, Index, PrimaryGeneratedColumn } from "typeorm";


@Entity("cm_contacts")
@ObjectType()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'uuid' })
    @Generated('uuid')
    @Index('uuid-idx')
    @Field()
    uuid: string;

    @Column({ name: 'phone_number' })
    @Field()
    phoneNumber: string;

    @Column({ name: 'is-public', default: false })
    @Field()
    isPublic: boolean;

    @Column({ default: false })
    deleted: boolean
} 