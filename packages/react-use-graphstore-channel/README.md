# React GraphStore Channel Hook 

## About

This is a light-weight React Hook for for sharing observable state Between Parent and Child Iframe, Worker, etc.

It solves the issues associated with passing objects, events and function calls between parent and child, especially in Cross Domain situations. This allows expensive work and/or security-sensitive work to be offloaded to sandboxed child iframes.

Optionally includes a zero-configuration, batteries included, runner for Webpack that adds decorator syntax to Babel.

## Features

- Written for modern (2019+) React
- Designed to complemnent `@besync/react-use-iframe`
- Secure, two way communication between host and child
- Works for both same domain and cross domain situations
- includes definitions for memory store
- roadmap: definitions for Firebase realtime database and Firestore
- Typescript definitions included
- No component classes or separate state manager required, pure React Hooks that can be used in function components

## Requirements

React 16.7 or later

## installation

```bash
$ npm install @besync/react-use-graphstore-channel
```

```js
import { useMemoryChannel } from ' @besync/react-use-graphstore-channel'
```

```js
import { useChildMemoryChannel } from '@besync/react-use-graphstore-channel'
```


## Usage: IFrame Container Example

``` js
import { useOnce, Observer } from '@besync/react-use-graphstore-channel'
import { useMemoryChannel } from '@besync/react-use-graphstore-channel'
import { useFrame } from '@besync/react-use-iframe'

const { initialState, stores } from '...'  // your model

const App = props => {
 
  const iframe = useFrame({ src: './frame.html' }, useMemoryChannel(initialState))
  const post = useOnce(() => stores.PostStore.getbyId('1'))

  return (
    <Observer>
      {() => (
        <div>
          HELLO {post.title}
          {iframe}
          <button onClick={() => { post.title = 'UPDATED' }} />
        </div>
      )}
    </Observer>
  )
}
```

## Usage: IFrame child of above container

``` js
import { useOnce, Observer } from '@besync/react-use-graphstore-channel'
import { useChildMemoryChannel } from '@besync/react-use-graphstore-channel'
import { useChildFrame } from '@besync/react-use-iframe'

const { stores } from '...'  // your model
const initialState = { posts: { 1: { title: 'loading' } } }

const App = props => {
 
   const framehelper = useChildFrame(useChildMemoryChannel(initialState))
   const post = useOnce(() => stores.PostStore.getbyId('1'))

  return (
    <Observer>
      {() => (
        <div>
          IFRAME START
          <p>{post.title}</p>
          <button onClick={() => { post.title = 'UPDATEDFRAME' }} />
          <h2>{post.title}</h2>
          IFRAME END
          {framehelper}
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
    require('@besync/react-use-iframe/berun'),
    require('@besync/react-use-graphstore-channel/berun')
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
- `@evecalm/message-hub` - Used for the two way RPC between parent and child, although any similar API-compatible channel can be used instead
- `@bestyled/berun` - Used to provide a zero configuration, batteries included, Webpack build, similar to `create-react-app`
- `react-use` - Used as inspiration for the React Hooks introduced in React 16.7; not used as a dependency
- `useState`, `useRef`, and `useEffects` introduced in React 16.7

## License

Apache 2.0
