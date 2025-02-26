import { GraphQLInterfaceType, GraphQLInt } from "graphql";

export const User = new GraphQLInterfaceType({
  name: "User",
  extensions: {
    someMetadata: true,
  },
  fields: () => ({
    id: {
      // still assumed to have the same column name as the field name
      type: GraphQLInt,
    },
  }),
  resolveType: (obj) => obj.$type,
});
