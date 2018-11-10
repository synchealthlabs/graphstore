import React from 'react'
import ReactDOM from 'react-dom'

import {
  useMemoryChannel
} from '@besync/react-use-graphstore-channel'

import {
  useOnce,
  Observer
} from '@besync/react-use-graphstore'

import { useFrame } from '@besync/react-use-iframe'

import { mockData, stores, User, Post } from '@besync/graphstore-test-blogdata'

const initialState = mockData()

const App = (props) => {

  const iframe = useFrame(
    { src: './frame.html' },   // replace with https://_______.ngrok.io/frame,html for testing cross domain
    useMemoryChannel(initialState)
  )
  const post: Post = useOnce(() => stores.PostStore.getbyId('1'))

  return (
    <Observer>
      {() => (
        <div className="container">
         <div className="row">
         <h2>This web page contains three containers;  the first and last run on the main page, the middle runs on an iFrame</h2>
         </div>
          <div className="row">
            <div className="column">
            <pre>CONTAINER #1 START</pre>
              <h1>Parent Container</h1>
              HELLO {post.user.name}
              <p>{post.title}</p>
              <a className="button" onClick={(e) => { post.title = 'updated from parent'}}>Change Text</a>
              <h6>{window.location.origin}</h6>
              <pre>CONTAINER #1 END</pre>
            </div>
            <div className="column"><pre>IFRAME START</pre>{iframe}<pre>IFRAME END</pre></div>
            <div className="column"><pre>CONTAINER #3 START</pre><Component /><pre>CONTAINER #3 END</pre></div>
          </div>
        </div>
      )}
    </Observer>
  )
}

const Component = (props) => {
  console.log('render2')
  const post: Post = useOnce(() => {
    console.log('useGS2')
    return stores.PostStore.getbyId('1')
  })
  const user: User = post.user

  return (
    <Observer>
      {() => (
        <>
          <h1>Component</h1>
          HELLO {post.user.name}
          <p>{post.title}</p>
          <a className="button" onClick={(e) => { post.title = 'updated from component'}}>Change Text</a>
        </>
      )}
    </Observer >
  )
}

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root')
)
