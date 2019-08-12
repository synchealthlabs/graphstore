import { URN_REMOTE, GraphStore, IFireDatabase } from '@besync/graphstore'
import { useGraphStoreMemoryWithRemote } from '@besync/react-use-graphstore'

import { SECRET, ACTIONS } from './constants'

export function useGraphStoreChildChannel(
  store: GraphStore
): (channel) => void {
  const db: IFireDatabase = store.db

  const callback = channel => {
    db.ref(URN_REMOTE).update(
      {
        update: (path, value, callback) => {
          channel.emit(ACTIONS.update, { path, value })
          console.log(path, 'FRAME: sent parent update')
          callback()
        },
        remove: (path, callback) => {
          channel.emit('remove', { path })
          console.log(path, 'FRAME: sent parent remove')
          callback()
        }
      },
      () => {
        console.log('FRAME: registered remote worker')
      }
    )

    channel.use((context, next) => {
      console.log('FRAME: request from parent', context.request)
      return next()
    })

    channel.ready().then(() =>
      channel.fetch(ACTIONS.handshake, SECRET).then(hydrate_data => {
        setTimeout(
          () =>
            db.ref().update(hydrate_data, () => {
              console.log('FRAME: hydrated', hydrate_data)
            }, true),
          0
        )
      })
    )

    channel.on(
      ACTIONS.update,
      ({ path, value }: { path: string; value: any; deleted: boolean }) => {
        db.ref(path).update(
          value,
          () => {
            console.log('FRAME: remote update', path, value)
          },
          true
        )
      }
    )

    channel.on(ACTIONS.remove, ({ path }: { path: string }) => {
      db.ref(path).remove(() => {
        console.log('FRAME: remote remove', path)
      }, true)
    })
  }

  return callback
}

export function useChildMemoryChannel<T>(
  initialState: T | (() => T)
): (channel) => void {
  return useGraphStoreChildChannel(useGraphStoreMemoryWithRemote(initialState))
}
