import { QueryRoot } from "./QueryRoot.js";
import { Viewer } from "./Viewer.js";
import { OtherUser } from "./OtherUser.js";
import { buildSchema } from "type-graphql";

export const schema = await buildSchema({
  resolvers: [QueryRoot],
  orphanedTypes: [Viewer, OtherUser],
});
