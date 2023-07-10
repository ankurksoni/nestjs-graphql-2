import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AssignPermissionsInput {

    @Field({ name: 'roleUUID' })
    roleUUID: string;

    @Field(type => [String], {name: "permissionUUIDs"})
    permissionUUIDs: string[];
}