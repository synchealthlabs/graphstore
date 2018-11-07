import React from 'react'
import ReactDOM from 'react-dom'
import { useChildFrame } from 'react-use-iframe'

console.log('FRAME STARTED')

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

const App = () => {
  return (
    <div>
      IFRAME
      {framehelper}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
