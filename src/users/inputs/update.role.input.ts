import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateRoleInput {
    @Field({ name: 'displayName' })
    @IsNotEmpty({ message: 'displayName required.' })
    displayName: string;

    @Field({ name: 'description' })
    @IsNotEmpty({ message: 'description required.' })
    description: string;
}