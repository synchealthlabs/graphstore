# React Hook for embedded Cross-Domain IFrames and Web Workers with 2 Way RPC Communication Channel

## About

This is a light-weight React Hook for inserting an iFrame into a React element.  

It solves the issues associated with passing objects, events and function calls between parent and child, especially in Cross Domain situations. This allows expensive work and/or security-sensitive work to be offloaded to sandboxed child iframes.

Optionally includes a zero-configuration, batteries included, runner for Webpack that automatically creates separate host and child entry points and HTML pages.

## Features

- Written for modern (2019+) React
- Custom positioning anywhere in your host React component with `{iframe}`
- iframe may contain any content including React components, third party widgets, etc.
- Automatic resizing of parent <iframe> DOM element height whenever child content changes
- Pass thru required props to iframe, such as `src`
- Secure, two way communication between host and child with `iopa` or `koa` style middleware API
- Works for both same domain and cross domain situations
- Typescript definitions included
- No component classes or separate state manager required, pure React Hooks that can be used in function components

## Requirements

React 16.7 or later

## installation

```bash
$ npm install react-use-iframe
```

```js
import { useFrame } from 'react-use-iframe'
```

```js
import { useChildFrame } from 'react-use-iframe'
```

## Usage (Parent)
```js
/// app.js 
import React from 'react'
import ReactDOM from 'react-dom'
import { useFrame } from 'react-use-iframe'

const App = (props) => {

  const iframe = useFrame({src: './frame.html'}, (channel)=>{

    channel.use((context, next) => {
      console.log('request from iframe', context.request)
      next()
    })

    channel.route('page-title', (context, next) => {
      context.response = document.title
    })

  })

  return (
    <div>Hello World
       {iframe}
    </div>
  )
  
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## Usage (Child React example)
```js
// ./src/frame.[js, tsx] 
import React from 'react'
import ReactDOM from 'react-dom'
import { useChildFrame } from 'react-use-iframe'

console.log("FRAME STARTED");

const framehelper = useChildFrame((channel) => {

  channel.use((context, next) => {
    console.log('request from parent', context.request)
    return next()
  })

  channel.route('getName', (context, next) => {
    context.response = 'myNameisMyPassport'
  })

  document.body.addEventListener('click', (e) => {
    // use ready to make sure the iframe is ready
    // (useChilfFrame channel callback is called before DOM is rendered)
    channel.ready().then(() =>
      channel.fetch('page-title', 'myparameter').then((resp) => {
        console.log('response from outer', resp)
      })
    )
  })
})

const App = () => {

  return (
    <div>
      This is the iFramne
        {framehelper}
    </div>
  );

}

ReactDOM.render(<App />, document.getElementById('root'))
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
    require('react-use-iframe/berun')
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
       "react-use-iframe": "0.1.0"
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

- `maslianok/react-resize-detector` - Used in the iFrame component to communicate resize events to the parent
- `@evecalm/message-hub` - Used for the two way RPC between parent and child
- `@bestyled/berun` - Used to provide a zero configuration, batteries included, Webpack build, similar to `create-react-app`
- `react-use` - Used as inspiration for the React Hooks introduced in React 16.7;  not used as a dependency
- `useState`, `useRef`, and `useEffects` introduced in React 16.7

## License

Apache 2.0