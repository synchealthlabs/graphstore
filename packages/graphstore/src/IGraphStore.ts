import { IObservableArray } from 'mobx/lib/types/observablearray';

// ENUMS

export enum SourceType {
    other,
    createFactory
}

// INTERFACES

export interface IGraphStoreStatus {
    executing: boolean
    success: boolean
    error: Error
}

/**
 * A persistent graph store that allows observable fetches and simple updates
 * 
 * The back-end could be a Firebase realtime database, a GraphQL Server, or just memory and disk
 * It is used to abstract the underlying database from GraphStore Model
 */
export interface IGraphStore {

   /**
    * Get a given database document (row)
    *
    * @param keys Primary keys to be searched for
    * @param path Database path of document (usually based on keys)
    * @param primaryKeys Simple list of all primary key names for the expected model
    * @param model observable object to update with selected document
    * @returns unsubscribe disposer function
    */
    observeDocument(keys: any, path: string, primaryKeys: string[], model: any): () => void 

    /**
    * Get a collection of database documents (rows) that match a partial primary key set
    *
    * @param keys Primary keys to be searched for
    * @param path Database path of documents (usually based on keys)
    * @param primaryKeys Simple list of all primary key names for the expected model
    * @param modelCollection Observable array to update with the collection and its additions, deletions, and changes over time
    * @param modelType constructor to use when adding items to this modelCollection
    * @returns unsubscribe disposer function
    */
    observeCollection(keys: any, path: string, primaryKeys: string[], modelCollection: IObservableArray<any>, modelType: any): () => void 
    
    /**
    * Update or delete the database at the given path
    *
    * @param path Database path of document
    * @param primaryKeys Simple list of all primary key names for the expected model
    * @param update_value Value including keys to update
    * @param status Status object on which interim status is returned
    * @param deleted true if the record is to be deleted, false if its to be updated
    */
    updateDocument(path: string, primaryKeys: string[], update_value: any, status: IGraphStoreStatus, deleted: boolean): void

}