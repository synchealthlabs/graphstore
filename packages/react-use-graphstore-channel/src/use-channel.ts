import { URN_REMOTE, toJS, GraphStore, IFireDatabase } from '@besync/graphstore'

import { SECRET, ACTIONS } from './constants'

import { useGraphStoreMemoryWithRemote } from '@besync/react-use-graphstore'

export function useGraphStoreChannel(store: GraphStore): (channel) => void {
  const db: IFireDatabase = store.db

  const callback = channel => {
    db.ref(URN_REMOTE).update(
      {
        update: (path, value, callback) => {
          channel.emit(ACTIONS.update, { path, value })
          console.log(path, 'sent child update')
          callback()
        },
        remove: (path, callback) => {
          channel.emit('remove', { path })
          console.log(path, 'sent child remove')
          callback()
        }
      },
      () => {
        console.log('registered remote worker')
      }
    )

    channel.route(ACTIONS.handshake, async (context, next) => {
      if (context.request !== SECRET) {
        return next()
      }
      console.log(context)
      context.response = toJS((await db.ref().once('value')).val())
    })

    channel.on(
      ACTIONS.update,
      ({ path, value }: { path: string; value: any; deleted: boolean }) => {
        db.ref(path).update(
          value,
          () => {
            console.log('remote update', path, value)
          },
          true
        )
      }
    )

    channel.on(ACTIONS.remove, ({ path }: { path: string }) => {
      db.ref(path).remove(() => {
        console.log('remote remove', path)
      }, true)
    })
  }

  return callback
}

export function useMemoryChannel<T>(
  initialState: T | (() => T)
): (channel) => void {
  return useGraphStoreChannel(useGraphStoreMemoryWithRemote(initialState))
}
