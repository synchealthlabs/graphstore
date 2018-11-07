import React from 'react'
import ReactDOM from 'react-dom'
import { useFrame } from 'react-use-iframe'

import { GraphStoreWorker } from './graphstore/GraphStoreWorker'

const store = new GraphStoreWorker({
  title: 'Test Application',
  posts: {
    1: {
      title: 'Blog post #1',
      content: 'This is sample content of the blog post'
    },
    2: {
      title: 'Blog post 21',
      content: 'This is more content for a blog post'
    }
  }
})

const App = props => {
  const iframe = useFrame({ src: './frame.html' }, worker => {
    worker.use((context, next) => {
      console.log('request from iframe', context.request)
      next()
    })

    worker.route('page-title', (context, next) => {
      context.response = document.title
    })
  })

  const item1: any = store.db.ref('/posts/1')

  return (
    <div>
      {item1.title}
      {iframe}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
