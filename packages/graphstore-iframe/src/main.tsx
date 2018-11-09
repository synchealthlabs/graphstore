import React from 'react'
import ReactDOM from 'react-dom'
import { useFrame } from 'react-use-iframe'
import { useGraphStore, User, Post, Observer } from './graphstore'



const App = props => {
  console.log("render1")

  const post: Post = useGraphStore((stores) => {console.log("useGS1"); return stores.PostStore.getbyId('1')})
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
    <Observer>{() => (<div>
      HELLO <p>{user.name}</p>
      {post.title}
      {iframe}
      <button onClick={() => { post.title = "UPDATED" }} />
    </div>)}</Observer>
  )
}

const App2 = props => {
  console.log("render2")
  const post: Post = useGraphStore((stores) => {console.log("useGS2"); return stores.PostStore.getbyId('1')})
  const user: User = post.user

  return (
    <Observer>{() => (<div>
      SECOND
      {post.title}
      <button onClick={() => { post.title = "UPDATED2" }} />
    </div>)}</Observer>
  )
}

ReactDOM.render(<><App /><App2 /></>, document.getElementById('root'))
