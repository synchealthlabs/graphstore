---
id: guide-connect
title: Connecting a database
---

## Load model and connect to Database

In the application entry point (e.g, `app.js`) connect the GraphStore to the appropriate backend.  For example, below we attach to an in memory store based on a large mock JSON object.   A Firebase example is in the `__tests__` folder (`PersistentModel_tests`).

```js
import { observer, autorun } from 'mobx';
import { Model, stores, GraphStoreMemory } from '@besync/graphstore';
import { mockData } from '@besync/graphstore-test-mockdata';

MobxUseStrict(true);

Model.setDefaultStore(new GraphStoreMemory(mockData()));

```

## Example input schema

We include some utility code generators (see packages/graphstore-dev) to generate a GraphQl schema from backend databases such as Firebase.   These schema are in turn converted into TypeScript code automatically, and used by the library.   An example of the input schema is as follows (typically code generated for large existing databases, but can be manually post-edited).

Note that we use graphql for the schema with custom decorators simply as a lingua franca; it does not imply that the server or the client libraries use GraphQL (although they certainly can be!)

``` graphql
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
