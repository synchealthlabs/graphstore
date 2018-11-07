import React from 'react'
import ReactDOM from 'react-dom'
import { useFrame } from 'react-use-iframe'

const App = (props) => {

  const iframe = useFrame({src: './frame.html'}, (worker)=>{

    worker.use((context, next) => {
      console.log('request from iframe', context.request)
      next()
    })

    worker.route('page-title', (context, next) => {
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