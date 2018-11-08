import React from 'react'
import ReactDOM from 'react-dom'
import { useFrame } from 'react-use-iframe'
import {useGraphStore, User, Post, observer } from './graphstore'

const App = observer(props => {

  const post: Post = useGraphStore((stores)=> stores.PostStore.getbyId('1'))
  const user: User = post.user

  const iframe = useFrame({ src: './frame.html' }, worker => {
    worker.use((context, next) => {
      console.log('request from iframe', context.request)
      next()
    })

    worker.route('page-title', (context, next) => {
      context.response = document.title
    })
  })
 
  return (
    <div>
      HELLO <p>{user.name}</p>
      {post.title}
      {iframe}
      <button onClick={() => { post.title = "UPDATED" }} />
    </div>
  )
})

ReactDOM.render(<App />, document.getElementById('root'))
