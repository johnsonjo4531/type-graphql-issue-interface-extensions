import { User } from "./User.js";
import { Field, ObjectType } from "type-graphql";

@ObjectType({
  implements: [User],
})
export class OtherUser extends User {
  @Field({
    nullable: true,
  })
  isAdmin: boolean;
}
