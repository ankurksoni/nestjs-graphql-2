import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { IdentityEntity } from "src/common/entities/identity-entity";

@InputType()
export class RoleInput extends IdentityEntity {
    @Field({ name: 'name' })
    @IsNotEmpty({ message: 'Name required.' })
    name: string;

    @Field({ name: 'displayName' })
    @IsNotEmpty({ message: 'displayName required.' })
    displayName: string;

    @Field({ name: 'description' })
    @IsNotEmpty({ message: 'description required.' })
    description: string;
}