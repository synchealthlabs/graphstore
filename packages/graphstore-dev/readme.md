
# GRAPHSTORE-DEV Model Generator

This repository contains an automatic code generator.  It converts a production Firebase to a GraphQL style database schema and in turn such a GraphQl schmea to typescript code that drops right into @besync/graphstore.

## Non-production prototype

This is a working prototype that was corrected to work off a single production database.   It will likely require some debugging and editing of the code generation to work for your database.

## Example input

```json
 "users": {
    "google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0": {
      "email": "demo@email.com",
      "profile_picture": "https://lh4.googleusercontent.com/-asdsdad/AAAAAAAAAAI/AAAAAAAAAJY/dfqq8tfiGoA/photo.jpg",
      "username": "Demo User"
    }
  }
```

## Example generated output (GraphQL)

```graphql
type User 
     @connector(byId: "(id) => getDocument('users/${id}')")
    {
        id: UserId! @primary,
        email: String!,
        profile_picture: String!,
        username: String!
        chats: [Chat] @resolver(get: "ChatsForUser(id)"),
        logs: [Log] @resolver(get: "LogsForUser(id)"),
        userPosts: [UserPost] @resolver(get: "UserPostsForUser(id)")
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
    @resolver get chats(): Chat[] { return ChatStore.getChatsForUser(this.id); };
    @resolver get logs(): Log[] { return LogStore.getLogsForUser(this.id); };
    @resolver get userPosts(): UserPost[] { return UserPostStore.getUserPostsForUser(this.id); };

    protected static Store: typeof Store = UserStore;

    constructor (defaults: {id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}
```

## Command Line Usage (Firebase Json to GraphQL)

``` bash
graphstore-dev firebase data/db-export.json build/schema.graphql
```

## Command Line Usage (GraphQL to TypeScript)

``` bash
graphstore-dev graphql build/schema.graphql src/model.ts
```

See besync\graphstore-test-mockdata package.json for an example of where this is used in an npm script.


## Alternative API to execute the generator from Javascript Node.js or equivalent application

``` js
var inputfile = path.resolve(__dirname, "../data/db-export.json");
var graphQLFile = path.resolve(__dirname, "../build/schema.graphql");
var modelTSFile = path.resolve(__dirname, "../src/model.ts");

createDirectories(graphQLFile);
createDirectories(modelTSFile);
importJsonExportGraphQl(inputfile, graphQLFile);
exportModelTs(modelTSFile, importGraphQl(graphQLFile));
```

## LICENSE

Apache 2.0
