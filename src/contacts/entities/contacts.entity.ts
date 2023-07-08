import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("cm_contacts")
@ObjectType()
export class Contact {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({ name: 'phone_number' })
    @Field()
    phoneNumber: string;

    @Column({ name: 'is-public', default: false })
    @Field()
    isPublic: boolean;
} 