import React from 'react'
import ReactDOM from 'react-dom'

import {
  useChildMemoryChannel
} from '@besync/react-use-graphstore-channel'

import {
  useOnce,
  Observer
} from '@besync/react-use-graphstore'

import { useChildFrame } from '@besync/react-use-iframe'

import { stores, Post } from '@besync/graphstore-test-blogdata'

const initialState = { posts: { 1: { title: 'loading' } } }

const FrameApp = () => {
  console.log('FRAME: FrameRender')

  const framehelper = useChildFrame(useChildMemoryChannel(initialState))

  const post: Post = useOnce(() => stores.PostStore.getbyId('1'))

  return (
    <Observer>
      {() => (
        <div className="container">
          <div className="row">
            <div className="column">
              <h1>IFrame Container</h1>
              <p>{post.title}</p>
              <a className="button" onClick={(e) => { post.title = 'updated from frame' }}>Change Frame Text</a>
              <h6>{window.location.origin}</h6>
            </div>
          </div>
          {framehelper}
        </div>
      )}
    </Observer>
  )
}

ReactDOM.render(<FrameApp />, document.getElementById('root'))
