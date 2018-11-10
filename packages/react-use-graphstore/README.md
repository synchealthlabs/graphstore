# React Hook for GraphStore

## About

This is a light-weight React Hook for for using observable state, backed by a local global store and/or a remote databasem in a React function component

Optionally includes a zero-configuration, batteries included, runner for Webpack that adds decorator syntax to Babel.

## Features

- Written for modern (2019+) React
- Use observable GraphStore features with two line setup
- includes definitions for memory store
- roadmap: definitions for Firebase realtime database and Firestore
- Typescript definitions included
- No component classes or separate state manager required, pure React Hooks that can be used in function components

## Requirements

React 16.7 or later

## installation

```bash
$ npm install @besync/react-use-graphstore
```

```js
import { useGraphStoreMemory } from ' @besync/react-use-graphstore'
```

```js
import { observer, useOnce } from '@besync/react-use-graphstore-channel'
```

```js
import { Observer, useOnce } from '@besync/react-use-graphstore-channel'
```


## Usage: Root component and observer

``` js
import { useGraphStoreMemory, Observer } from '@besync/react-use-graphstore'

const { initialState, stores } from '...'  // your model

const App = props => {
 
  const store = useGraphStoreMemory(initialState)   
  const post = useOnce(() => stores.PostStore.getbyId('1'))

  return (
    <Observer>
      {() => (
        <div>
          HELLO {post.title}
        </div>
      )}
    </Observer>
  )
}
```

## Usage: another component
``` js
import { useGraphStoreMemory, Observer } from '@besync/react-use-graphstore'

const { stores } from '...'  // your model

const Component = props => {
 
  const post = useOnce(() => stores.PostStore.getbyId('1'))

  return (
    <Observer>
      {() => (
        <div>
          HELLO AGAIN {post.title}
          <button onClick={() => { post.title = 'UPDATED' }} />
        </div>
      )}
    </Observer>
  )
}
```

## Webpack Build

You need to make sure there are two separate entry points in Webpack (one for the main
javascript, one for the iFrame specific javascript) and two separate HTML files created by the HTML Plugin.

The simplest way to do this is with [`@breun/scripts`](https://github.com/bestyled/berun):

### @berun configuration

```js
// config/berun.config.js
module.exports = {
  use: [
    '@berun/preset-react',
    '@berun/runner-eslint',
    require('@besync/react-use-graphstore/berun')
  ]
}
```

`package.json`

```json
{
  "scripts": {
    "start": "berun-scripts start",
    "build": "berun-scripts build",
    "format": "berun-scripts lint",
    "test": "berun-scripts test --env=jsdom",
    "eject": "berun-scripts eject"
  },
  "dependencies": {
    "react": "next",
    "react-dom": "next",
    "@besync/react-use-graphstore": "..."
  },
  "devDependencies": {
    "@berun/scripts": "...",
    "@berun/preset-react": "...",
    "@berun/runner-eslint": "..."
  },
  "resolutions": {
    "babel-core": "^7.0.0-bridge.0"
  }
}
```

## Prior Art

- `@besync/graphstore` - Used to provide the observable store in both parent and worker childs; query the store using a simple Document/Collection based interface, then get and set properties on the underlying result with auto-refresh whenever the underlying store changes (locally, in child worker, or remotely)
- `@bestyled/berun` - Used to provide a zero configuration, batteries included, Webpack build, similar to `create-react-app`
- `react-use` - Used as inspiration for the React Hooks introduced in React 16.7; not used as a dependency
- `useState`, `useRef`, and `useEffects` introduced in React 16.7

## License

Apache 2.0
