import { Model, GraphStoreMemory, GraphStore } from '@besync/graphstore'
import { useMemo } from 'react'

export function useGraphStoreMemory<T>(
  initialState: T | (() => T)
): GraphStore {
  const store: GraphStore = useMemo(() => {
    let data = new GraphStoreMemory(initialState)
    Model.setDefaultStore(data)
    return data
  },
  [])

  return store
}
