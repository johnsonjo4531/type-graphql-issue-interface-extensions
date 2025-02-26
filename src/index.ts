import "reflect-metadata";
import { schema } from "./Schema.js";
import { graphql } from "graphql";
import { schema as graphQLSchema } from "./example-graphql/Schema.js";

function gql(strings, ...args) {
  return strings.join("");
}

const source = gql`
  {
    findUsersById(ids: [1]) {
      ... on Viewer {
        id
        isAdmin
      }
    }
  }
`;

graphql({ schema, source }).then((result) => {
  // console.log({ result: JSON.stringify(result, null, 2) });
});

console.log({
  graphqlHasSomeMetadata: (graphQLSchema as any)._queryType._fields.user.type
    .extensions.someMetadata,
  typeGraphQLHasSomeMetadata: (schema as any)._queryType._fields.user.type
    .extensions?.someMetadata,
});
if (
  (schema as any)._queryType._fields.user.type.extensions?.someMetadata !=
  (graphQLSchema as any)._queryType._fields.user.type.extensions.someMetadata
) {
  throw new Error("TEST FAILED: NO SUCH EXTENSION METADATA in TypeGraphQL!!!");
}
console.log("TEST PASSED! Extension metadata exists just as in GraphQL");
