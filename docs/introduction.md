---
id: introduction
title: Graphstore
sidebar_label: Introduction
---

An observable persistent real-time store for React and React Native

## About

GraphStore is a tiny, observable, persistent real-time store based on MobX.  

It allows one to use JavaScript objects as application state, ensuring it keeps up to date and in sync across the application and with the backend persistent store or database.  

```js
let user = stores.UserStore.getbyId(userId)};
user.name = 'GraphStore Expert';  // updates the database in real time
```

It is "graph-aware", so when accesing the property `userPosts` on the document `user`, GraphStore automatically uses the user_id field to traverse to the `UserPosts` collection and finds the `Posts` associated with that user.  It figures all this out from the schema.

```js
let posts = user.userPosts;  // actually generates a database observable subscription
```

> It's a bit like table joins and foreign keys, but for modern graph databases.  And it just works with no API.


## Small footprint API

Most of GraphStore just works by using MobX with a well-defined statically typed schema.   Behind the scenes we extend the observables, and have some collection functions, but most of your client code will look simpler with few to no API calls, just the occasional MobX decorator.

## Generating the input schema

We include some utility code generators in [`@besync/graphstore-dev`](schema-generator.md) to generate a GraphQL schema from backend databases such as Firebase.   These schema are in turn converted into TypeScript code automatically, and used by the library.   

Note that we use GraphQL for the schema with custom decorators simply as a *lingua franca*; it does not imply that the server or the client libraries use GraphQL (although they certainly can!)

## Example usage (React)

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

## Back end integrations

Currently the library has connectors for the Firebase realtime database and for a JSON-based in memory store.  The roadmap includes the Firebase Cloud Firestore, MongoDB, and maybe others by community request.

## License

Apache 2.0