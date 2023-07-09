import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Generated, Index, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class IdentityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'uuid' })
    @Generated('uuid')
    @Field()
    uuid: string;

    @Column({ default: false })
    deleted: boolean
} 