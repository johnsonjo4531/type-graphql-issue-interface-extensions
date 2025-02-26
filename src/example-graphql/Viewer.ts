import { GraphQLObjectType, GraphQLInt, GraphQLBoolean } from "graphql";
import { User } from "./User.js";

export const Viewer = new GraphQLObjectType({
  name: "Viewer",
  interfaces: [User],
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve() {
        return 1;
      },
    },
    isAdmin: {
      type: GraphQLBoolean,
      resolve() {
        return 2;
      },
    },
  }),
});
