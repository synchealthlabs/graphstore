import React from 'react'
import ReactDOM from 'react-dom'
import { useFrame } from '@besync/react-use-iframe'

const App = props => {
  const iframe = useFrame({ src: './frame.html' }, channel => {
    channel.use((context, next) => {
      console.log('request from iframe', context.request)
      next()
    })

    channel.route('page-title', (context, next) => {
      context.response = document.title
    })
  })

  return (
    <div>
      Hello World
      {iframe}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
