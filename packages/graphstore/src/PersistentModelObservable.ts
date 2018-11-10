import {
  observable,
  getAtom,
  _isComputingDerivation,
  IObservableArray,
  isObservableArray,
  untracked,
  toJS as mobx_toJS,
  IAtom
} from 'mobx'

/**
 * An observable collection in @besync/GraphStore;  it extends the MobX observable array
 * with some additional properties
 */
export interface IEnhancedObservableArray<T> extends IObservableArray<T> {
  /**
   * Indicates if this collection is currently being retrieved from the persistent store
   */
  loading: boolean

  /**
   * Indicates if this collection was found in the persistent store
   */
  exists: boolean

  /**
   * Factory method to create a new document in the collection
   */
  create(): T

  /**
   * Used internally by @besync/GraphStore; not an authorized public API
   */
  $emobx: any
}

/**
 * Used internally by @besync/GraphStore on Models and Collections to notify when
 * any observed field in the document or collection is under active observation
 */
export interface IEnhancedObservableDelegate {
  /**
   * IEnhancedObservableDelegate.addObserver
   *
   * Used internally by @besync/GraphStore to indicate when the first new observer is watching this collection
   */
  addObserver(): void

  /**
   * IEnhancedObservableDelegate.addObserver
   *
   * Used internally by @besync/GraphStore to indicate when no more observers are watching this collection
   */
  releaseObserver(): void
}

/**
 * Factory to create a new MobX observable field that has the additional magic of @besync/GraphStore
 * to notify when any observed field in the document is under active observation
 *
 * @param data The object of the given document to become observable
 * @param delegate The document owner that will receive @besync/GraphStore observation notifications
 */
export function enhancedObservable(
  data: any,
  delegate: IEnhancedObservableDelegate
): any {
  let o

  if (data !== null && typeof data == 'object') {
    o = observable.map(data)
  } else {
    o = observable.box(data)
  }

  const atom = getAtom(o) as any
  const onBecomeUnobserved = atom.onBecomeUnobserved
  const reportObserved = atom.reportObserved
  let isObserved = false
  atom.isPendingUnobservation = false
  atom.onBecomeUnobserved = function() {
    const res = onBecomeUnobserved.apply(atom, arguments)
    if (isObserved) {
      isObserved = false
      delegate.releaseObserver()
    }
    return res
  }
  atom.reportObserved = function() {
    const res = reportObserved.apply(atom, arguments)
    if (!isObserved && _isComputingDerivation()) {
      isObserved = true
      delegate.addObserver()
    }
    return res
  }

  return o
}

/**
 * Factory to create a new MobX observable array that has the additional magic of @besync/GraphStore
 * to notify when the collection is under active observation, and with loading, exists properties
 *
 * @param delegate The document owner that will receive @besync/GraphStore observation notifications
 */
export function enhancedObservableArray(
  delegate: IEnhancedObservableDelegate
): IEnhancedObservableArray<any> {
  const o = observable.array() as IEnhancedObservableArray<any>
  const atom = getAtom(o) as any
  const onBecomeUnobserved = atom.onBecomeUnobserved
  const reportObserved = atom.reportObserved
  let isObserved = false
  atom.isPendingUnobservation = false

  o.$emobx = { loading: observable.box(true) }

  Object.defineProperty(o, 'loading', {
    enumerable: true,
    configurable: true,
    get: function() {
      return this.$emobx.loading
    },
    set: function(v) {
      this.$emobx.loading.set(v)
    }
  })

  Object.defineProperty(o, 'exists', {
    enumerable: true,
    configurable: true,
    get: function() {
      return this.length > 0
    }
  })

  atom.onBecomeUnobserved = function() {
    const res = onBecomeUnobserved.apply(atom, arguments)
    if (isObserved) {
      isObserved = false
      delegate.releaseObserver()
    }
    return res
  }

  atom.reportObserved = function() {
    const res = reportObserved.apply(atom, arguments)
    if (!isObserved && _isComputingDerivation()) {
      isObserved = true
      delegate.addObserver()
    }
    return res
  }

  return o
}

/**
 * Helper method to determine if an object is a @besync/GraphStore Enhanced MobX observable collection
 *
 * @param thing the object to test
 */
export function isEnhancedObservableArray(
  thing: any
): thing is IEnhancedObservableArray<any> {
  return thing && thing.$emobx !== undefined && isObservableArray(thing)
}

/**
 * Helper method to determine if an object is a @besync/GraphStore Enhanced MobX observable document
 *
 * @param thing the object to test
 */
export function isEnhancedObservable(
  thing: any
): thing is IEnhancedObservableDelegate {
  return thing && thing.$emobx !== undefined && thing.addObserver !== undefined
}

/**
 * Recursively converts an (enhanced or non-enhanced observable) object to a javascript structure.
 * Supports observable arrays, objects, maps and primitives. Computed values and other non-enumerable
 * properties won't be part of the result. Cycles are detected and properly supported by
 * default, but this can be disabled to improve performance.
 *
 * @param source the MobX observable
 * @param options { detectCycles default true}
 */
export function toJS<T>(source: T, options?: ToJSOptions): T
export function toJS(source: any, options?: ToJSOptions): any {
  if (typeof options === 'boolean') {
    options = { detectCycles: options }
  }

  if (isEnhancedObservableArray(source)) {
    const res = []
    const toAdd = source.map(value => toJS(value, options))
    res.length = toAdd.length
    for (let i = 0, l = toAdd.length; i < l; i++) {
      res[i] = toAdd[i]
    }
    return res
  }

  if (isEnhancedObservable(source)) {
    return untracked(() =>
      Object.keys(source)
        .concat(Object.keys(source['$emobx']))
        .reduce((result, key, index, array) => {
          result[key] = toJS(source[key], options)
          return result
        }, {})
    )
  }

  return mobx_toJS(source, options)
}

/**
 * Like toJS but only includes the non Primary key fields in the resultant object
 *
 * @param source the MobX observable
 * @param primaryKeys the list of primary keys to exclude
 */
export function toJS_nonPrimary(source, primaryKeys: string[]) {
  if (isEnhancedObservable(source)) {
    return untracked(() =>
      Object.keys(source)
        .concat(Object.keys(source['$emobx']))
        .filter(key => primaryKeys.indexOf(key) == -1)
        .reduce((result, key, index, array) => {
          result[key] = toJS(source[key])
          return result
        }, {})
    )
  }

  return toJS(source)
}

/**
 * Like toJS but only includes the @beysnc/GraphStore tracked fields in the resultant object
 *
 * @param source the MobX observable
 */
export function toJS_Tracked(source) {
  if (isEnhancedObservable(source)) {
    return Object.keys(source)
      .concat(Object.keys(source['$emobx']))
      .reduce((result, key, index, array) => {
        result[key] = toJS(source[key])
        return result
      }, {})
  }

  return toJS(source)
}

/**
 * Like toJS but only includes the Primary key fields in the resultant object
 *
 * @param source the MobX observable
 * @param primaryKeys the list of primary keys to include
 */
export function toJS_Primary(source, primaryKeys: string[]) {
  if (isEnhancedObservable(source)) {
    return untracked(() =>
      Object.keys(source)
        .concat(Object.keys(source['$emobx']))
        .filter(key => primaryKeys.indexOf(key) !== -1)
        .reduce((result, key, index, array) => {
          result[key] = toJS(source[key])
          return result
        }, {})
    )
  }

  return toJS(source)
}

/**
 * Factory method to create a new document in a collection
 *
 * @param source the collection
 */
export function push<T>(source: IEnhancedObservableArray<T>): T {
  if (!source.exists) {
    throw new Error('Enhanced Observable array is not found or invalid')
  }

  if (isEnhancedObservableArray(source)) {
    return source.create()
  }

  throw new Error('Argument to push must be an Enhanced Observable Array')
}

/**
 * Helper method used internally by @besync/GraphStore to hide all the private
 * properties of a Model from enumeration, Object.keys(), .map(), etc.
 *
 * @param source the collection
 */
export function makeNonEnumerable(obj, ...names) {
  names.forEach(makeNonEnumerable)

  function makeNonEnumerable(name) {
    let pd = Object.getOwnPropertyDescriptor(obj, name)
    pd.enumerable = false
    Object.defineProperty(obj, name, pd)
  }
}

type ToJSOptions = {
  detectCycles?: boolean
  exportMapsAsObjects?: boolean
  recurseEverything?: boolean
}
