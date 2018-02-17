---
id: schema
title: Schemas
---

Using a graph datastore that automatically tracks links between entities in the graph requires knowledge about the schema.  Its a reason why query languages such as GraphQL require a schema definition.

Some realtime and NoSql databases such as Firebase have in the past relaxed the need for schemas, but we think we can have the best of both worlds.  Using such schema-less databases, but in the client applications, defining an extensible schema that contains at a minimum the keys of the relationship links.  

This is what GraphStore requires.   To keep things simple, the schema is defined using a single `.graphql` file that can be used to both generate the model used by GraphStore, as well as to create a production API GraphQL server etc. 

> The good news is that if you are using Firebase you can generate this GraphQL like schema automatically from the raw data in the database using some of the tooling in [@besync/graphstore-dev](https://github.com/beysnc/graphstore.dev).    More on that next.


## Example Schema

```graphql
type Post 
     @connector(byId: "(id) => getDocument('posts/${id}')")
     @connector(All: "() => getCollection('posts')")
    {
        id: ID! @primary,
        body: String!,
        starCount: Int!,
        stars: [Json!] @json(id: "User!", value: "Boolean!"),
        title: String!,
        uid: User!
    }
    
type UserPost 
     @connector(byId: "(user_id, id) => getDocument('userPosts/${user_id}/${id}')")
     @connector(UserPostsForUser: "(user_id) => getCollection('userPosts/${user_id}')")
    {
        user: User! @foreign @primary,
        id: ID! @primary,
        body: String!,
        starCount: Int!,
        stars: [Json!] @json(id: "UserId!", value: "Boolean!"),
        title: String!,
        uid: User!
    }

type User 
     @connector(byId: "(id) => getDocument('users/${id}')")
    {
        id: UserId! @primary,
        email: String!,
        profile_picture: String!,
        username: String!
        userPosts: [UserPost] @resolver(get: "UserPostsForUser(id)")
    }
```

### GraphQL Decorators

You'll notice a few custom decorators in the above GraphQL schema, supported by GraphStore:

#### @primary

Indicates that the field is part of the primary key;  one or more fields may be marked as primary.

#### @foreign

Indicates that the field is a foreign key in a 1-1 (or many-1) relationship.  

> The magic of GraphStore is that these fields are abstracted so that one can just refer to `userPost.user` and GraphStore will automatically use the `user_id` field in `UserPost` to lookup the corresponding `User` and populate this as a deep object within the `userPost` object.   GraphStore will handle the subscriptions, update reactions, and unsubscriptions automatically.

#### @connector

The `@connector` decriptor specifies the Get queries that can be performed on this type.   It includes a reference path to the underlying database such as Firebase.  GraphStore generally provides a `getDocument` and `getCollection` for all supported databases, and `@connector` just maps these appropriately.

#### @resolver

The `@resolver` is used to indicate 1-many foreign keys (in traditional relational databases) or the equivalent links in a graph database.  It provides the query (`@connector`) to use on the given foreign type.

## Example model generated from Schema

```js
export class Post extends Model 
{

    @primary @observable id: string;
    @observable body: string;
    @observable starCount: int;
    @observable @jsonfield stars: Post._Star[];
    @observable title: string;
    @observable uid: User;

    protected static Store: typeof Store = PostStore;

    constructor (defaults: {id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}

export namespace Post {
    export class _Star extends Submodel
    {
    @observable id: User;
    @observable item_value: boolean;
    }
}

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
```

