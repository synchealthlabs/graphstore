import {
  GraphStore,
  IFireDatabase,
  IFireDatabaseSnapshot
} from '@besync/graphstore'

if (!String.prototype['startsWith']) {
  String.prototype['startsWith'] = function(search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search
  }
}

/**
 * The implementation of a persistent graph store that uses a JSON object in memory
 */
export class GraphStoreWorker extends GraphStore {
  /**
   * constructor
   *
   * @param initialState The initial JSON object to use as the store data
   */
  constructor(initialState: any) {
    var db = new WorkerDatabase(initialState)
    super(db)
  }
}

/**
 * An in memory database that implements the minimum viable Firebase Realtime Database V3 API
 *
 * Not typically used outside GraphStoreWorker but provided in case it's useful for mocking
 * tests or applications outside of @besync/GraphSTore
 */
export class WorkerDatabase implements IFireDatabase {
  private data: any
  private subscriptions: any = {}
  private subscriptionsCollection: any = {}

  /**
   * constructor
   *
   * @param data The initial JSON object to use as the store data
   */
  constructor(data) {
    this.data = data
  }

  ref(path: string) {
    let unsubscribe: () => void = () => null
    let self = this

    return {
      on: function(eventType: string, callback) {
        switch (eventType) {
          case 'value':
            unsubscribe = self._onValue(path, callback)
            break
          case 'child_added':
            unsubscribe = self._onCollection(path, callback)
            break
          case 'child_removed':
            self._onCollectionChildRemoved(path, callback)
            break
          case 'child_changed':
            self._onCollectionChildUpdated(path, callback)
            break
        }
      },

      off: unsubscribe,

      update: function(update_value: any, callback: (a: Error) => void) {
        self._update(path, update_value, false, callback)
      },

      remove: function(callback: (a: Error) => void) {
        self._update(path, null, true, callback)
      }
    }
  }

  private _onValue(path: string, callback: (data: any) => void): () => void {
    let self = this

    let result = deepFind(self.data, path)

    self.subscriptions[path] = self.subscriptions[path] || []
    self.subscriptions[path].push(callback)

    if (result == null) {
      setTimeout(callback.bind(null, null), 55)
    } else {
      let resultSnapshot = { val: () => result }
      setTimeout(callback.bind(null, resultSnapshot), 55)
    }

    return () => {
      let index = self.subscriptions[path].indexOf(callback)
      if (index > -1) {
        self.subscriptions[path].splice(index, 1)
      }
    }
  }

  goOffline() {
    // NO OP
  }

  private _onCollection(
    path: string,
    childAdded: (data: any) => void
  ): () => void {
    let self = this

    self.subscriptionsCollection[path] =
      self.subscriptionsCollection[path] || []
    let callbacks = { childAdded }
    self.subscriptionsCollection[path].push(callbacks)

    let resultdb = deepFind(this.data, path)

    let result = objectToSnapshotArray(resultdb)

    result.forEach(item => {
      setTimeout(childAdded.bind(null, item), 55)
    })

    return () => {
      let index = self.subscriptionsCollection[path].indexOf(callbacks)
      if (index > -1) {
        self.subscriptionsCollection[path].splice(index, 1)
      }
    }
  }

  private _onCollectionChildRemoved(
    path: string,
    childRemoved: (data: any) => void
  ): void {
    let callbacks = this.subscriptionsCollection[path]
    let lastcallback = callbacks[callbacks.length - 1]
    lastcallback.childRemoved = childRemoved
  }

  private _onCollectionChildUpdated(
    path: string,
    childUpdated: (data: any) => void
  ): void {
    let callbacks = this.subscriptionsCollection[path]
    let lastcallback = callbacks[callbacks.length - 1]
    lastcallback.childUpdated = childUpdated
  }

  private _update(
    path: string,
    update_value: any,
    deleted: boolean,
    callback: (a: Error) => void
  ): void {
    let isAdded = false
    let oldresult
    let self = this

    if (deleted) {
      oldresult = {}

      Object.keys(self.subscriptionsCollection)
        .filter(subscriptionPath => {
          return path['startsWith'](subscriptionPath)
        })
        .forEach(subscriptionPath => {
          let result = deepFind(this.data, subscriptionPath)

          if (!(typeof result == 'object')) { result = { item_value: result } }

          if (subscriptionPath.length < path.length) {
            let remainingPath = path.substr(subscriptionPath.length + 1)
            result = subsetFind(
              result,
              path.substr(subscriptionPath.length + 1)
            )
          }

          let resultSnapshot
          if (Object.keys(result).length == 1) {
            let key = Object.keys(result)[0]
            resultSnapshot = {
              key: key,
              val: () => result[key],
              result_DeleteMe: result[key]
            }
          } else {
            throw new Error(
              'Unexpectedly multiple keys found during Mock _update'
            )
          }

          oldresult[subscriptionPath] = resultSnapshot
        })

      deepUpdate(this.data, path, null)
    } else {
      isAdded = deepUpdate(this.data, path, update_value)
    }

    setTimeout(callback.bind(null, null), 0)

    Object.keys(self.subscriptions)
      .filter(subscriptionPath => {
        return path['startsWith'](subscriptionPath)
      })
      .forEach(subscriptionPath => {
        let result = deepFind(this.data, subscriptionPath)

        let resultSnapshot = { val: () => result }

        self.subscriptions[subscriptionPath].forEach(sink => {
          sink(resultSnapshot)
        })
      })

    Object.keys(self.subscriptionsCollection)
      .filter(subscriptionPath => {
        return path['startsWith'](subscriptionPath)
      })
      .forEach(subscriptionPath => {
        let resultSnapshot

        if (deleted) {
          resultSnapshot = oldresult[subscriptionPath]
        } else {
          let result = deepFind(this.data, subscriptionPath)

          if (!(typeof result == 'object')) {  result = { item_value: result } } 

          if (subscriptionPath.length < path.length) {
            let remainingPath = path.substr(subscriptionPath.length + 1)
            result = subsetFind(
              result,
              path.substr(subscriptionPath.length + 1)
            )
          }

          if (Object.keys(result).length == 1) {
            let key = Object.keys(result)[0]
            resultSnapshot = {
              key: key,
              val: () => result[key],
              result_DeleteMe: result[key]
            }
          } else {
            throw new Error(
              'Unexpectedly multiple keys found during Mock _update'
            )
          }
        }

        self.subscriptionsCollection[subscriptionPath].forEach(sink => {
          if (deleted) { sink.childRemoved(resultSnapshot) }
          else if (isAdded) { sink.childAdded(resultSnapshot) }
          else { sink.childUpdated(resultSnapshot) }
        })
      })
  }
}

/**
 * Private helper function used by WorkerDatabase
 *
 * Returns the part of an object represent by the given path
 *
 * For example
 * { level1: { level2: { level3: "result" }, level2b: { level3: "not returned" }}}, "level1/level2"
 * returns { level3: "result" }
 *
 * @param obj the JSON object to navigate
 * @param path the string representation of the path to return
 * @returns the node of the sub-object represented by the path
 */
function deepFind(obj: any, path: string): any {
  let paths = path.split('/'),
    current = obj,
    i

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined
    } else {
      current = current[paths[i]]
    }
  }
  if (!(typeof current == 'object')) { return current }
  else { return JSON.parse(JSON.stringify(current)) }
}

/**
 * Private helper function used by WorkerDatabase
 *
 * Returns the part of an object represent by the given path
 * with the root to this node added back in to the result
 *
 * For example
 * { level1: { level2: { level3: "result" }, level2b: { level3: "not returned" }}}, "level1/level2"
 * returns { level1: { level2: { level3: "result" }}}
 *
 * @param obj the JSON object to navigate
 * @param path the string representation of the path to return
 * @returns the subset of the entire object represented by this path
 */
function subsetFind(obj: any, path: string): any {
  let paths = path.split('/'),
    current = obj,
    i

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined
    } else {
      current = current[paths[i]]
    }
  }

  if (typeof current === 'object') { current = Object['assign']({}, current) }

  let result = current
  for (i = paths.length - 1; i >= 0; --i) {
    result = { [paths[i]]: result }
  }

  return result
}

/**
 * Private helper function used by WorkerDatabase
 *
 * Creates or updates the part of an object represent by the given path
 *
 * @param obj the JSON object to navigate
 * @param path the string representation of the path to update
 * @param update_value the JSON object to create/update at the given location
 * @returns true if the item was create, false if was updated
 */
function deepUpdate(obj: any, path: string, update_value: any): boolean {
  let paths = path.split('/'),
    current = obj,
    i,
    key,
    isAdded = false,
    parent = null

  for (i = 0; i < paths.length - 1; ++i) {
    parent = current
    if (current[paths[i]] == undefined) {
      if (update_value == null) {
        throw new Error('Item to delete not found in Database')
      }
      else { current = current[paths[i]] = {} }
    } else {
      current = current[paths[i]]
    }
  }

  i = paths.length - 1
  key = paths[i]
  if (current[key] === undefined) {
    if (update_value == null) {
      throw new Error('Item to delete not found in Database')
    }
  }

  if (update_value == null) {
    delete current[key]
    if (Object.keys(current).length == 0) { delete parent[paths[paths.length - 2]] }
  } else {
    if (current[key] === undefined) { isAdded = true }
    current[key] = update_value
  }

  return isAdded
}

/**
 * Private helper function used by WorkerDatabase
 *
 * Converts an object to an array of sub-objects and returns as an array of {key, val()} objects
 *
 * @param objectToMap the JSON object to convert
 * @returns An array of {key, val()} objects
 */
function objectToSnapshotArray(objectToMap: any): IFireDatabaseSnapshot[] {
  let result: IFireDatabaseSnapshot[] = []

  Object.keys(objectToMap).forEach(keyValue => {
    let _objRemainder = objectToMap[keyValue]
    result.push({ key: keyValue, val: () => _objRemainder })
  })

  return result
}
