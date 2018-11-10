import {
  Model,
  GraphStoreMemory,
  ProxyUpdate,
  GraphStore
} from '@besync/graphstore'
import { useMemo } from 'react'

export function useGraphStoreMemoryWithRemote<T>(
  initialState: T | (() => T)
): GraphStore {
  const store: GraphStore = useMemo(() => {
    let data = new GraphStoreMemory(initialState, ProxyUpdate)
    Model.setDefaultStore(data)
    return data
  },
  [])

  return store
}
