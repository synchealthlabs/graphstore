# Graphstore
[![CircleCI](https://circleci.com/gh/besync/graphstore.svg?style=svg)](https://circleci.com/gh/besync/graphstore)

An observable persistent real-time store based on Mobx

## About

GraphStore is an observable persistent real-time store for React based on Mobx.  It allows one to 

## Example input schema ()

We include some utility code generators (see packages/graphstore-dev) to generate a GraphQl schema from backend databases such as Firebase.   These schema are in turn converted into TypeScript code automatically, and used by the library.   An example of the input schema is as follows (typically code generated for large existing databases, but can be manually post-edited).

Note that we use graphql for the schema with custom decorators simply as a lingua franca; it does not imply that the server or the client libraries use GraphQL (although they certainly can be!)

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


## Example usage (raw MOBX)

This is a lightweight library with no depencency on React.  It uses per Mobx observable and atoms under the covers.   So you can even use it console applications like the following:

```js
/**
* Subscribe to database and display an observable
*
* @param userid Primary key of user to display
* @returns unsubscribe disposer function -- call this to release any underlying database subscription
*/
function (userid: string): () => {} {

    var user = stores.UserStore.getbyId(userId)}

    return autorun((r) => {
        /* will be called whenever user changes */
       if (!user.loading)
         console.log("Hello " + user.username);
    }
}
```

The variable user will now stay up to date 


## Back end integrations

Currently the library has connectors for the Firebase realtime database, a JSON-based in memory store, and a cross-domain parent-iframe-worker store.


## Installation for development

``` bash
brew install yarn --without-node
npm install -g lerna
lerna bootstrap
```

If using Firebase for testing (we also include a mock firebase in memory server), download your service account credentials to `firebase.secrets.json`

## Run test

``` bash
npm  test
```

## Development Stack

- Lerna: mono repository manager
- Build: BeRun scripts including Typescript, Jest, TSLint, Prettier, Webpack
- Yarn: Node package manager
- TypeDoc: Documenteration generator
- Docusaurus: Documentation publisher
- Visual Studio Code: IDE
- CircleCI: Continuous integration

## Other dependencies

- Gulp: used solely for TypeDoc documentation generator

## License

Apache 2.0