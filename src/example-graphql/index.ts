import "reflect-metadata";
import { schema } from "./Schema.js";
import { graphql } from "graphql";

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
  console.log({ result: JSON.stringify(result, null, 2) });
});
