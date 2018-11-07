import React, { useRef, useEffect, useState } from 'react'
import {default as Channel} from '@evecalm/message-hub'

export const useFrame = (props, callback) => {

  const ref = useRef<HTMLIFrameElement>()
  const [ height, setHeight ] = useState(0)

  useEffect(() => {

    const frameWin = (ref!.current!).contentWindow
    if (!frameWin) { return; }
   
    const channel = new Channel({ type: 'frame', peer: frameWin, targetOrigin: 'http://localhost:3000' })

    channel.on("resize", height => {
      setHeight(height)
    });

    callback(channel)

  }, [])

  return (<iframe frameBorder={0} ref={ref} style={{ width: "100%", height }}  {...props} />)
  
}
