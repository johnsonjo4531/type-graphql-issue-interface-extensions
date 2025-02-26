# Example Repo Showing Issue with TypeGraphQL's Metadata in Interface Types.

This repo has an example in **src/index.ts** that compares the output of pure graphql.js and type-graphql.
The outputs differ in that the type-graphql does not seem to have the intreface type's extensions metadata along with it this is a bug and prevents me from using
certain libraries along with type-graphql.

## Running the example

If you have `make` available just run the following from the root of the repo:

```bash
make
```

otherwise use the following in your terminal at the root of the repo:

```bash
npm i && npm run build && npm run start
```

Without doing anything you should see the one test failing comparing type-graphql's metadata on the interface to graphql's metadata on the interface.

## More on the Underlying Issue

The following `someMetadata: true` is missing from this **InterfaceType**'s extensions when you try and get the metadata from the query.

**src/User.ts**
```ts
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
```

I also have the following query:

**src/QueryRoot.ts**

```ts
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
```

After the schema is built I expect the metadata to be available on the `schema`, just as it is on the `graphQLSchema` (which is the same example schema but in pure graphql.js) but currently it is not in `schema`... and the below test fails instead of passes.

```ts
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
```



## The Info I Can Give at the Moment Towards the Problem.

In the below code as I was stepping through it I noticed that `interfaceType.type` does not have the metadata but `interfaceType.metadata` does!
I'm not sure what the difference is between those two, but I thought this information would help.

**type-graphql/build/esm/schema.js**
```ts
// elided...
export class SchemaGenerator {
    // elided...
    static getGraphQLOutputType(target, propertyName, type, typeOptions = {}) {
        let gqlType;
        gqlType = convertTypeIfScalar(type);
        // elided...
        if (!gqlType) {
            const interfaceType = this.interfaceTypesInfo.find(it => it.target === type);
            if (interfaceType) {
                this.usedInterfaceTypes.add(interfaceType.target);
                // Around line 509 This interfaceType.type does not have the metadata but interfaceType.metadata does!!!
                gqlType = interfaceType.type;
            }
        }
        // elided...
        const { nullableByDefault } = BuildContext;
        return wrapWithTypeOptions(target, propertyName, gqlType, typeOptions, nullableByDefault);
    }
    // elided...
}
// elided...
```