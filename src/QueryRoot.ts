import { GraphQLResolveInfo } from "graphql";
import { User } from "./User.js";
import { Info, Query, Resolver } from "type-graphql";

@Resolver(() => Query)
export class QueryRoot {
  @Query(() => User, {
    nullable: true,
  })
  user(@Info() resolveInfo: GraphQLResolveInfo) {
    return {
      id: 1,
    };
  }
}
