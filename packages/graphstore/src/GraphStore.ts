import { action, IObservableArray } from 'mobx';
import { IGraphStoreStatus, IGraphStore } from './IGraphStore';

// FIREBASE API SURFACE USED (V3)

/**
 * A database snapshot in a persistent store that implementes the Firebase Realtime Database V3 API
 */
export interface IFireDatabaseSnapshot {
    val(): any;
    readonly key: string;
}

/**
 * A database reference in a persistent store that implementes the Firebase Realtime Database V3 API
 */
export interface IFireDatabaseRef {
    on(eventType: string, callback)
    off: () => void
    update(update_value: any, callback: (a: Error) => void)
    remove(callback: (a: Error) => void)
}

/**
 * A persistent store that implements the Firebase Realtime Database V3 API
 */
export interface IFireDatabase {
    ref(path: string): IFireDatabaseRef
    goOffline: () => void
}

/** 
 * The default implementation of a persistent graph store
 * 
 * The default implementation is based on JSON-like structures so works well with JSON object
 * memory store, Firebase Realtime Database, and in fact any store that implements the basic 
 * Firebase API represented by IFireDatabase
 */
export class GraphStore implements IGraphStore {

    db: IFireDatabase;

    /**
    * constructor
    * 
    * @param db a persistent store that implementes the Firebase Realtime Database V3 API
    */
    constructor(db: IFireDatabase) {
        this.db = db;
    }

    /**
    * Get a given database document (row)
    *
    * @param keys Primary keys to be searched for
    * @param path Database path of document (usually based on keys)
    * @param primaryKeys Simple list of all primary key names for the expected model
    * @param model observable object to update with selected document
    * @returns unsubscribe disposer function
    */
    observeDocument(keys: any, path: string, primaryKeys: string[], model: any): () => void {

        let ref = this.db.ref(path);

        let unsubscribe = ref.off.bind(ref);

        ref.on('value', action((snapshot: IFireDatabaseSnapshot) => {

            if (snapshot == null) {
                model.exists = false;
                model.loading = false;
                model._isDirty = false;

            } else {

                let data = snapshot.val();
                if (data == null) {
                    model.exists = false;
                    model.loading = false;
                    model._isDirty = false;
                } else {
                    if (!(typeof data == 'object')) data = { "item_value": data };

                    data = Object["assign"](data, keys);

                    Object.getOwnPropertyNames(data).forEach((key) => { model[key] = data[key] });
                    model.exists = true;
                    model._deleted = false;
                    model.loading = false;
                    model._isDirty = false
                }
            }

        }));

        return unsubscribe;

    }

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
    observeCollection(keys: any, path: string, primaryKeys: string[], modelCollection: IObservableArray<any>, modelType: any): () => void {

        let ref = this.db.ref(path);

        let unsubscribe = ref.off.bind(ref);

        ref.on('child_added', action((snapshot: IFireDatabaseSnapshot) => {
            let items = arrayObjecttToFlatArray(snapshot, keys, primaryKeys);
            items.forEach((item) => {
                let model = new modelType(item);
                model.loading = false;
                model.exists = true;
                modelCollection.push(model)
            })
            modelCollection["loading"] = false;
        }));

        ref.on('child_changed', action((snapshot: IFireDatabaseSnapshot) => {

            let items = arrayObjecttToFlatArray(snapshot, keys, primaryKeys);
            items.forEach((newitem) => {

                let olditem = modelCollection.find((item) => primaryKeys.every((key) => newitem[key] == item[key].toString()));
                if (olditem === undefined)
                    throw new Error('404 Database updated record that was not found');

                Object.getOwnPropertyNames(newitem).forEach((key) => { olditem[key] = newitem[key] });
                // olditem.exists = true;
                // olditem.loading = false;
                // olditem._deleted = false;
                olditem._isDirty = false;

            })
            modelCollection["loading"] = false;


        }));

        ref.on('child_removed', action((snapshot: IFireDatabaseSnapshot) => {
            let items = arrayObjecttToFlatArray(snapshot, keys, primaryKeys);
            items.forEach((newitem) => {
                let olditem = modelCollection.find((item) => primaryKeys.every((key) => newitem[key] == item[key].toString()));
                if (olditem === undefined) throw new Error('404 Database deleted record that was not found');
                modelCollection.remove(olditem);
                olditem.keys().forEach((key) => { this[key] = null; });
                olditem.exists = false;
                // olditem.loading = false;
                // olditem._deleted = true;
                olditem._isDirty = false;
            });
        }));

        return unsubscribe;

    }

    /**
    * Update or delete the database at the given path
    *
    * @param path Database path of document
    * @param primaryKeys Simple list of all primary key names for the expected model
    * @param update_value Value including keys to update
    * @param status Status object on which interim status is returned
    * @param deleted true if the record is to be deleted, false if its to be updated
    */
    updateDocument(path: string, primaryKeys: string[], update_value: any, status: IGraphStoreStatus, deleted: boolean): void {

        status.executing = true;

        if ((Object.keys(update_value).length == 1) && (update_value.item_value !== undefined)) {
            let pathsegments = path.split('/');
            var lastsegment = pathsegments.pop();
            path = pathsegments.join('/');
            update_value = { [lastsegment]: update_value.item_value }
        }

        let ref = this.db.ref(path);

        if (!deleted)
            ref.update(update_value, action((a: Error) => {
                status.executing = false;
                if (a)
                    status.error = a;
                else
                    status.success = true;
            }));
        else
            ref.remove(action((a: Error) => {
                status.executing = false;
                if (a)
                    status.error = a;
                else
                    status.success = true;
            }));
    }

}

// PRIVATE UTILITY FUNCTIONS

/**
 * Helper function used internally to convert a database complex object to a flat collection of documents
 */
function arrayObjecttToFlatArray(snapshot: IFireDatabaseSnapshot, keys: any, allPrimaryKeys: string[]): any[] {

    let resultArray = [];
    let currentKey = Object.keys(keys).length;

    if (currentKey >= allPrimaryKeys.length) throw new Error("Tried to create collection when entire primary key is known");

    let nextPrimaryKey = allPrimaryKeys[currentKey];

    let preceedingKeys = Object["assign"]({}, keys, { [nextPrimaryKey]: snapshot.key });

    flatMap(resultArray, preceedingKeys, snapshot.val(), allPrimaryKeys, currentKey + 1);

    return resultArray;
}

/**
 * Helper function used by arrayObjecttToFlatArray to recursively navigate the object
 */
function flatMap(resultArray: any[], precedingKeys: any, objectToMap: any, allPrimaryKeys: string[], currentKey: number): void {

    if (currentKey >= allPrimaryKeys.length) {
        let result = objectToMap;
        if (typeof result !== 'object') result = { "item_value": objectToMap }

        result = Object["assign"]({}, precedingKeys, result);
        resultArray.push(result);
        return;
    }

    let keyName = allPrimaryKeys[currentKey];

    Object.keys(objectToMap).forEach((keyValue) => {
        let _objRemainder = objectToMap[keyValue];
        let _precedingKeys = Object["assign"]({}, precedingKeys, { [keyName]: keyValue });
        flatMap(resultArray, _precedingKeys, _objRemainder, allPrimaryKeys, currentKey + 1);
    });

}