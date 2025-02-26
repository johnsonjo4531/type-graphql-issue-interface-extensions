import { QueryRoot } from "./QueryRoot.js";
import { Viewer } from "./Viewer.js";
import { OtherUser } from "./OtherUser.js";
import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";

export const schema = new GraphQLSchema({
  query: QueryRoot,
  types: [Viewer, OtherUser],
});
