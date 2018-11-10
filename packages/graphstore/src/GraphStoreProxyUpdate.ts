import { IFireDatabase } from './GraphStore'

export const URN_REMOTE = 'urn:org.js.graphstore:remote'

/**
 * An in memory database that implements the minimum viable Firebase Realtime Database V3 API
 *
 * Not typically used outside GraphStoreWorker but provided in case it's useful for mocking
 * tests or applications outside of @besync/GraphSTore
 */
export class ProxyUpdateDatabase implements IFireDatabase {
  private db: IFireDatabase
  private _data: object

  /**
   * constructor
   *
   * @param db The core database on which to add update proxy
   */
  constructor(db: IFireDatabase) {
    this.db = db
    this._data = {
      [URN_REMOTE]: {
        update: (...props) => {
          console.log('NOT SETUP')
          console.log(props)
        },
        remove: (...props) => {
          console.log('NOT SETUP')
          console.log(props)
        }
        // TODO CACHE FIRST REQUESTS
      }
    }
  }

  ref(path: string) {
    let ref = this.db.ref(path)

    return {
      on: ref.on,

      off: ref.off,

      once: ref.once,

      update: (
        update_value: any,
        callback: (a: Error) => void,
        isRemoteOrigin: boolean = false
      ) => {
        if (path == URN_REMOTE) {
          this._data[path] = update_value
          setTimeout(callback.bind(null, null), 0)
          return
        }

        ref.update(
          update_value,
          isRemoteOrigin
            ? callback
            : () => this._data[URN_REMOTE].update(path, update_value, callback)
        )
      },

      remove: function(
        callback: (a: Error) => void,
        isRemoteOrigin: boolean = false
      ) {
        ref.remove(
          isRemoteOrigin
            ? callback
            : () => this._data[URN_REMOTE].remove(path, callback)
        )
      }
    }
  }

  goOffline() {
    return this.db.goOffline()
  }

  goOnline() {
    return this.db.goOnline()
  }
}

export const ProxyUpdate = (db: IFireDatabase) =>
  new ProxyUpdateDatabase(db) as IFireDatabase
