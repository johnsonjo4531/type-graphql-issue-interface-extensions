import { GraphQLObjectType, GraphQLInt } from "graphql";
import { User } from "./User.js";

export const OtherUser = new GraphQLObjectType({
  name: "OtherUser",
  interfaces: [User],
  extensions: {
    joinMonster: {
      sqlTable: "user",
      uniqueKey: "id", // the id in each row is unique for this table
    },
  },
  fields: () => ({
    id: {
      // the column name is assumed to be the same as the field name
      type: GraphQLInt,
    },
  }),
});
