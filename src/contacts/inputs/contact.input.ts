import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, isNotEmpty, MaxLength, MinLength, minLength } from "class-validator";

@InputType('ContactInput')
export class ContactInput {

    @Field()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(14)
    phoneNumber: string
}