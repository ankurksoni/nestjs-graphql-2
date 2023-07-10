import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AssignRolesInput {

    @Field({ name: 'userUUID' })
    userUUID: string;

    @Field(type => [String], { name: "roleUUIDs" })
    roleUUIDs: string[];
}