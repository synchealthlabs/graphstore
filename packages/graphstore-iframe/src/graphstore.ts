/* Initialize Graphstore */
import { GraphStoreWorker } from './lib/graphstore/GraphStoreWorker'
import { mockData, stores, Stores } from '@besync/graphstore-test-blogdata';
import { Model } from '@besync/graphstore';
Model.setDefaultStore(new GraphStoreWorker(mockData()))
import { useMemo } from 'react'

export { User, Post } from '@besync/graphstore-test-blogdata';
export function useGraphStore<T>(fn: (s: Stores) => T){ return useMemo(() => fn(stores), []) }

export { observer, Observer } from './lib/react-mobx'