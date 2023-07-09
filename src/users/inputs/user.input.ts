import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { UserType } from "../enums/usertype.enum";

@InputType()
export class UserInput {
    @Field({name: 'fullName'})
    @IsNotEmpty({ message: 'Full name required.' })
    fullName: string;

    @Field({name: 'username'})
    @IsNotEmpty({ message: 'username required.' })
    username: string;

    @Field({name: 'email'})
    @IsNotEmpty({ message: 'email required.' })
    email: string;

    @Field({name: 'password'})
    @IsNotEmpty({ message: 'password required.' })
    @MinLength(4)
    @MaxLength(10)
    password: string;

    @Field({name: 'confirmPassword'})
    @IsNotEmpty({ message: 'confirm password required.' })
    @MinLength(4)
    @MaxLength(10)
    confirmPassword: string;

    @Field(type => UserType, {name: 'userType', nullable: true})
    userType: UserType;

    @Field({name: 'active'})
    active: boolean;
}