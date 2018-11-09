import React from 'react'
import ReactDOM from 'react-dom'
import { useChildFrame } from 'react-use-iframe'

import { useGraphStore, User, Post, observer } from './graphstore'

const FrameApp = () => {

  const framehelper = useChildFrame(channel => {
    channel.use((context, next) => {
      console.log('request from iframe', context.request)
      return next()
    })

    channel.route('getName', (context, next) => {
      context.response = 'hahahahahah'
    })

    document.body.addEventListener('click', e => {
      // use ready to make sure the peer is ready
      channel.ready().then(() =>
        channel.fetch('page-title', 'ssss').then(resp => {
          console.log('response from outer', resp)
        })
      )
    })
  })

  const post: Post = useGraphStore((stores)=> stores.PostStore.getbyId('1'))
  const user: User = post.user

  return (
    <div>
      IFRAME START
      <p>{user.name}</p>
      <h2>{post.title}</h2>
      IFRAME END
      {framehelper}
    </div>
  )
}

ReactDOM.render(<FrameApp />, document.getElementById('root'))
