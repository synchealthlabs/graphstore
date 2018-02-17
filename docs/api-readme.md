---
id: api-readme
title: API
sidebar_label: API
---


# Graphstore

An observable persistent real-time store based on Mobx

## About

GraphStore is an observable persistent real-time store for React based on Mobx.  It allows one to 

## Installation

```bash
npm install graphstore --save
```

## Usage: Get from store

```js
import { observer, autorun } from 'mobx';
import { Model, stores, GraphStoreMemory } from '@besync/graphstore';
import { mockData } from '@besync/graphstore-test-mockdata';

Model.setDefaultStore(new GraphStoreMemory(mockData()));

let user = stores.UserStore.getbyId(userId)};
let posts = user.userPosts;
```

The `user` object returned is actually an observable object that will stay up to date whenever the state changes (whether within the application or directly on the back end store).

By accessing the userPosts property, GraphStore will automatically "lazy-connect" to the database to get the associated `UserPosts` for this `User`.  Again the `posts` object in this case is an observable collection that will stay up to date with any added, deleted, or updates posts.  


## Usage: Business Logic / UI

GraphStore objects are just MobX observables.  So in a React `@obseserver render()` method or in a console application `autorun` they just stay up to date.   They also contain a useful `loading` property.  

```js
autorun(() => { 
    console.log(
        (!(user.loading || users.userPosts.loading)) ? 
             `${user.name} has ${posts.length} posts` 
               : 'loading from database' )
      });
```

## Usage: Render (React)

The following class will automatically subscribe to the database starting with the first render, and will automatically release the subscription when the component is no longer in scope.  The render() will be recalled whenever any of the data changes (from the database or from other views).

```js
@observer
class UserView extends Component {

  constructor(props) {
    super(props);
    this.state =  { user: User = stores.UserStore.getbyId(props.userId)};
  }
  
  render() {
        return (user.loading) ? <div>Loading<div> : 
        <div>
        Hello this.state.user.username;
        </div>
    }
}
```


## Usage: Update/Delete actions

GraphStore keeps the backend persistent store up to date with any state changes.   Just remember to wrap them in MobX `actions` if using strict mode.

```js 
@action function update() {
  userPosts[1].delete();
  user.name = "GraphStore Expert";
}
```

## Usage: Create actions

GraphStore uses `push` on a collection to create new documents. Just remember to wrap them in MobX `actions` so that you can add all the primary keys etc before the back end store is updated.

```js 
@action function create() {
  var newPost = userPosts.push();
  newPost.id = "-myNewPost";
}
```

## Example input schema ()

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



## Back end integrations

Currently the library has connectors for the Firebase realtime database and for a JSON-based in memory store.  


## License

Apache 2.0


### External modules

* [[GraphStore Module]](api-modules-graphstore-module.md)
* [[GraphStoreFirebase Module]](api-modules-graphstorefirebase-module.md)
* [[GraphStoreMemory Module]](api-modules-graphstorememory-module.md)
* [[IGraphStore Module]](api-modules-igraphstore-module.md)
* [[PersistentModel Module]](api-modules-persistentmodel-module.md)
* [[PersistentModelObservable Module]](api-modules-persistentmodelobservable-module.md)



---
