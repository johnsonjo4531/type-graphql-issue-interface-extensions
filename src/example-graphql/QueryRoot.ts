import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import { User } from "./User.js";

export const QueryRoot = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: {
      type: User,
      resolve: (parent, args, context, resolveInfo) => {
        // resolve the user and the comments and any other descendants in a single request and return the data!
        // all you need to pass is the `resolveInfo` and a callback for querying the database
        return {
          id: 1,
        };
      },
    },
  }),
});
