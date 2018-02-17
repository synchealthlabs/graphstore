---
id: model-generator
title: Generating the Model
---
[`@besync/graphstore-dev`](https://github.com/besync/graphstore-dev) contains several automatic code generators.  It converts GraphQL style database schema into to typescript code that drops right into [`@besync/graphstore`](https://github.com/besync/graphstore)

The GraphQL parsing is accomplished with the robust [`graphql-tag`](https://www.npmjs.com/package/graphql-tag) library and the Facebook reference [`graphql`](https://www.npmjs.com/package/graphql) implementation.  So this part of the generator should be stable across a wide range of schema.   

> Tip: we suggest adding the `graphstore-dev graphql` command line (see below) to your regular development workflow so that adding fields/types to the schema is a simple one file edit and build.


## Example input (GraphQL schema)

We use GraphQL for the schema with custom decorators simply as a lingua franca; it does not imply that the server or the client libraries use GraphQL (although they certainly can be!).  It provides an easy way to represent both traditional relational models as well as modern graph contexts.

We don't require or interpret all the GraphQL boiler-plate, but focus on the `type` objects and `enums`.

```graphql
type User 
     @connector(byId: "(id) => getDocument('users/${id}')")
    {
        id: UserId! @primary,
        email: String!,
        profile_picture: String!,
        username: String!
        userPosts: [UserPost] @resolver(get: "UserPostsForUser(id)")
    }

enum EnumPeriod 
    {
        allTime,
        day,
        week,
        month,
        quarter,
        year
    }
```

## Example generated output (TypeScript)

```js
export class User extends Model 
{

    @primary @observable id: string;
    @observable email: string;
    @observable profile_picture: string;
    @observable username: string;
    @resolver get userPosts(): UserPost[] { return UserPostStore.getUserPostsForUser(this.id); };

    protected static Store: typeof Store = UserStore;

    constructor (defaults: {id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}

export namespace enums {
    export enum EnumPeriod
    {
        allTime = "allTime",
        day = "day",
        week = "week",
        month = "month",
        quarter = "quarter",
        year = "year"
    }
}
```

## Command Line Usage (GraphQL to TypeScript)

``` bash
graphstore-dev graphql build/schema.graphql src/model.ts
```

See [`@besync/graphstore-test-mockdata`](https://github.com/besync/graphstore-test-mockdata) package.json for an example of where this is used in an npm script.


## Alternative API to execute the generator from Javascript Node.js or equivalent application

``` js
const importJsonExportGraphQl = require('@besync/graphstore-dev').importJsonExportGraphQl,
    importGraphQl = require('@besync/graphstore-dev').importGraphQl,
    exportModelTs = require('@besync/graphstore-dev').exportModelTs;

var inputfile = path.resolve(__dirname, "../data/db-export.json");
var graphQLFile = path.resolve(__dirname, "../build/schema.graphql");
var modelTSFile = path.resolve(__dirname, "../src/model.ts");

createDirectories(graphQLFile);
createDirectories(modelTSFile);
importJsonExportGraphQl(inputfile, graphQLFile);
exportModelTs(modelTSFile, importGraphQl(graphQLFile));
```
