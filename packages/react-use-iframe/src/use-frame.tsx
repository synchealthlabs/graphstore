import React, { useRef, useEffect, useState } from 'react'
import { default as Channel } from '@evecalm/message-hub'

export const useFrame = (props: { src: string, [key:string]: any}, callback) => {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(0)

  const matches = props.src.match(/(^https?\:\/\/[^\/?#]+)(?:[\/?#]|$)/i);
  const domain = (matches && matches[1]) || window.location.origin

  useEffect(() => {
    const frameWin = ref!.current!.contentWindow
    if (!frameWin) {
      return
    }

    const channel = new Channel({
      type: 'frame',
      peer: frameWin,
      targetOrigin: domain
    })

    channel.on('resize', height => {
      setHeight(height)
    })

    callback(channel)
  }, [])

  return (
    <iframe
      frameBorder={0}
      ref={ref}
      style={{ width: '100%', height }}
      {...props}
    />
  )
}
