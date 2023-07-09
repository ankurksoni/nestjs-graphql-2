import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateUserInput {
    @Field({name: 'fullName'})
    @IsNotEmpty({ message: 'Full name required.' })
    fullName: string;

    @Field({name: 'email'})
    @IsNotEmpty({ message: 'email required.' })
    email: string;
}