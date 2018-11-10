import { default as Channel } from '@evecalm/message-hub'
import React, { useMemo } from 'react'
import ReactResizeDetector from 'react-resize-detector'

export const useChildFrame = callback => {
  return useMemo(() => {
    const channel = new Channel({ type: 'frame', peer: parent })

    const onResize = (height, width) => {
      channel.emit('resize', width)
    }

    callback(channel)

    return <ReactResizeDetector handleHeight onResize={onResize} />
  }, [])
}
