---
id: stores-models
title: Models and Stores
---

Each *type* in a GraphQL schema is represented as a `Store` and a `Model` in GraphStore.  It corresponds to a document in NoSQL databases, and a table in a traditional RDBMS.

#### Example GraphQL schema modeled below
```graphql
type User 
    {
        id: String!,
        email: String!,
        profile_picture: String!,
        userPosts: [UserPost]
    }
```

# Models

A model is the schema of a given *type* represented in TypeScript or JavaScript.    This is where a lot of the magic happens in GraphStore, as behind the scenes every field is represented as some sort of extended Observable -- a MobX observable with some extra batteries included.

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
```

> We use TypeScript purely to provide static type checking.  It works especially well with  [`Visual Studio Code`](https://code.visualstudio.com/).  Otherwise we just develop in ES2015 or later, but of course you can use everything from plain JavaScript to OCaml for your projects.  


# Stores

A store is a container of all the entries of a given *type*.    For example in a blogging application, it could represent all the `Users`.   

```js
export class UserStore extends Store {
    static getbyId(id): User { return User.getDocument({id}, `users/${id}`);}
    static path({id}): string { return `users/${id}` }
}
```

GraphStore works some MobX magic to cache in memory only those entries that are actually in use, leaving the remainder in the persistent store.  

Each store provides a number of utility methods to connect to the relevant collection in the backend persistent store, for example `getbyId`, `getAllUsersForPost` etc. 