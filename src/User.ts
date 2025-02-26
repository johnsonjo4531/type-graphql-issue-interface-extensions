import { Extensions, Field, InterfaceType } from "type-graphql";
@InterfaceType({
  resolveType(obj) {
    return obj.$type;
  },
})
@Extensions({
  someMetadata: true,
})
export class User {
  @Field({ nullable: true })
  id: number;
}
