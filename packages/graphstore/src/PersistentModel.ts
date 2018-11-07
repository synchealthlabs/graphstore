import 'reflect-metadata';
import { enhancedObservable, enhancedObservableArray, IEnhancedObservableArray, IEnhancedObservableDelegate, toJS, toJS_Primary, toJS_nonPrimary, toJS_Tracked, makeNonEnumerable } from './PersistentModelObservable';
import { observable as mobx_observable, reaction, action, untracked } from 'mobx';
import { IGraphStore, SourceType, IGraphStoreStatus } from './IGraphStore';

export { computed as resolver } from 'mobx';
export { toJS, push, IEnhancedObservableArray } from './PersistentModelObservable';

export class Status implements IGraphStoreStatus {
    @mobx_observable executing: boolean = false;
    @mobx_observable success: boolean = true;
    @mobx_observable error: Error = null;
}

/**
* A model is a schema of a given type represented in TypeScript or JavaScript.    
* This is where a lot of the magic happens in @besync/GraphStore, as behind the scenes every field 
* is represented as some sort of extended Observable -- a MobX observable with some extra 
* batteries included.
*/
export class Model implements IEnhancedObservableDelegate {

    private $emobx;

    @mobx_observable public loading: boolean = false;
    @mobx_observable public exists: boolean = true;
    public status: Status;
    protected static Store: typeof Store;
    protected static defaultGraphStore: IGraphStore;

    @mobx_observable _isDirty: boolean;
    private _observedRefCount: number = 0;
    private _dirtyStoreWatcherDispose: any = null;
    private _deleted: boolean = false;

    private _source: SourceType;
    private _graphStore: IGraphStore;

    private _primaryKeys: string[];
    private _currentKeys: any = null;
    private _currentPath: string = null;
    private _unsubscribe: () => void = null;

    /**
    * Constructor
    *
    * @param defaults key value dictionary to populate the initial model
    * @param graphstore optional store to use for document and collection queries/actions
    */
    constructor(defaults: any, graphStore?: IGraphStore) {

        // INITIALIZE FIELDS
        this._observedRefCount = 0;
        this._graphStore = graphStore || Model.defaultGraphStore;
        this._dirtyStoreWatcherDispose = null;
        this._primaryKeys = Reflect.getMetadata("primarykeys", this.constructor.prototype);
        this.$emobx = {};
        this.status = new Status();
        this.status["id"] = new Date().toUTCString()
        this._source = SourceType.other;

        Object.keys(defaults).forEach(key => {
            this[key] = defaults[key];
        });

        this._isDirty = false;

        // HIDE PRIVATE FIELDS
        makeNonEnumerable(this,
            "$emobx",
            "_observedRefCount",
            "_graphStore",
            "_primaryKeys",
            "_isDirty",
            "_deleted",
            "_source",
            "_currentPath",
            "_currentKeys",
            "_unsubscribe",
            "_dirtyStoreWatcherDispose");

        // HIDE NON-DATABASE BACKED PUBLIC FIELDS AND METHODS
        makeNonEnumerable(this,
            "loading",
            "exists",
            "status"
        );

    }

    /**
    * Deletes this document from the store
    */
    @action.bound
    delete(): void {
        this._deleted = true;
        this._isDirty = true;
    }

    /**
    * IEnhancedObservableDelegate.addObserver
    * 
    * Used internally by @besync/GraphStore to indicate when the first new observer is watching this collection
    */
    addObserver() {
        if (!this._graphStore) { return; }
        const observers = ++this._observedRefCount;
        if (observers == 1) { this.inUse(); }
    }

    /**
    * IEnhancedObservableDelegate.addObserver
    * 
    * Used internally by @besync/GraphStore to indicate when no more observers are watching this collection
    */
    releaseObserver() {
        if (!this._graphStore) { return; };
        const observers = --this._observedRefCount;
        if (observers == 0) { this.notInUse(); }
    }

    private inUse() {
        if (this._isDirty) { throw new Error("InUse: Founded database updates before first use"); }

        var self = this;

        if (self._source == SourceType.createFactory) {
            // NOOP
        } else {
            // START READ CONNECTION
            this._unsubscribe = this._graphStore.observeDocument(this._currentKeys, this._currentPath, this._primaryKeys, this);
        }

        // USE MOBX TO AUTO UPDATE / DELETE
        this._dirtyStoreWatcherDispose = reaction(
            (r) => self._isDirty,
            (truthy) => {

                if (!truthy) { return; }
                self._isDirty = false;

                var data = toJS(self);

                if (self._primaryKeys.filter((key) => data[key] == null).length > 0) {
                    throw new Error("All primary keys must be updated in a batch; at least one was null");
                }

                self._primaryKeys.filter((key) => data[key] !== null).forEach(key => delete data[key]);

                self._graphStore.updateDocument((<typeof Model>self.constructor).Store.path(self), this._primaryKeys, data, self.status, self._deleted)

            });
    }

    private notInUse() {
        if (this._unsubscribe) {
            this._unsubscribe();
            this._unsubscribe = null;
        }

        if (this._dirtyStoreWatcherDispose !== null) {
            this._dirtyStoreWatcherDispose();
            this._dirtyStoreWatcherDispose = null;
        }

    }

    /**
    * Get the keys of this model, including both owned properties and those managed by @besync/GraphStore
    *
    * @returns List of keys as a string array
    */
    keys(): string[] {
        return Object.keys(this).concat(Object.keys(this.$emobx));
    }

    /**
    * Gets a string representation of this model in JSON format,
    * useful for debugging purposes
    *
    * @returns string representation of this model in JSON format
    */
    toString() {
        return untracked(() => "{ " + Object.keys(this).concat(Object.keys(this.$emobx)).map((key) => key + ": " + this[key].toString()).join(', ') + " }");
    }

    /**
    * Class method to set the default persistent store for all instances of this model type
    *
    * @param graphStore the default persistent store
    */
    static setDefaultStore(graphStore: IGraphStore) {
        Model.defaultGraphStore = graphStore;
    }

    /**
    * Class method to get an observable document from the default persistent store
    *
    * @param keys A key:value dictionary representing the primary keys to query on
    * @param: path A string representing the database access path to the location of the document
    * @returns An instance of this model that can be observed over time to represent the selected document 
    */
    static getDocument(keys: any, path: string): any {

        let model = new this(keys, Model.defaultGraphStore);
        model.loading = true;

        const observers = model._observedRefCount;

        model._currentKeys = keys;
        model._currentPath = path;

        return model;

    }

    /**
    * Class method to get an observable collection of documents from the default persistent store
    *
    * @param keys A key:value dictionary representing the subset of primary keys to query on
    * @param: path A string representing the database access path to the location of the collection
    * @returns An instance of this model that can be observed over time to represent the selected document 
    */
    static getCollection(keys: any, path: string): any[] {
        let array = new ModelCollection(this, keys, path, Model.defaultGraphStore);
        return array.observable;
    }

}

/**
 * In @besync/GraphStore, Collections are simply lists of related documents. The documents may be related 
 * on the basis of actually beings stored in the same collection (or table) on the same backend 
 * database, or may be the result of an observable query based on navigating the object graph or
 * joining one or more database tables. 
*/
export class ModelCollection implements IEnhancedObservableDelegate {

    private _graphStore: IGraphStore;
    private _primaryKeys: string[];
    private _currentKeys: any;
    private _currentPath: string;
    private _unsubscribe: () => void;
    private _modelType: any;
    private _observableArray: IEnhancedObservableArray<any>

    /**
    * Constructor, usually called internally by @besync/GraphStore
    *
    * @param modelType the constructor function to use when creating new documents in the collection
    * @param keys A key:value dictionary representing the common subset of primary keys for this collection
    * @param path A string representing the database access path to the location of the collection
    * @param graphStore The persistent store where this collection exists
    */
    constructor(modelType: any, keys: any, path: string, graphStore: IGraphStore) {

        graphStore = graphStore;
        this._graphStore = graphStore;

        this._currentKeys = keys
        this._currentPath = path;
        this._observableArray = enhancedObservableArray(this);

        Object.defineProperty(this._observableArray, "create", {
            enumerable: true,
            configurable: true,
            get: function () {
                return () => {
                    let model = new modelType(keys, graphStore);
                    model._currentKeys = keys;
                    model._currentPath = path;
                    model._source = SourceType.createFactory
                    return model;
                }
            }
        });

        this._modelType = modelType;
        this._primaryKeys = Reflect.getMetadata("primarykeys", modelType.prototype);
    }

    /**
    * Returns the observable MobX array that represents the data in this collection
    *
    * @returns the MobX observable array
    */
    get observable(): IEnhancedObservableArray<any> {
        return this._observableArray;
    }

    /**
    * IEnhancedObservableDelegate.addObserver
    * 
    * Used internally by @besync/GraphStore to indicate when the first new observer is watching this collection
    */
    addObserver(): void {
        this._unsubscribe = this._graphStore.observeCollection(this._currentKeys, this._currentPath, this._primaryKeys, this._observableArray, this._modelType);
    }

    /**
    * IEnhancedObservableDelegate.releaseObserver
    * 
    * Used internally by @besync/GraphStore to indicate when no more observers are watching this collection
    */
    releaseObserver(): void {
        if (this._unsubscribe) {
            this._unsubscribe();
            this._unsubscribe = null;
        }
    }

}

/** 
 * A submodel represents an observable JSON object structure contained for a given field of a model
 * 
 * It behaves just like a root Model, with all the @besync/GraphStore and MobX magic
 */
export class Submodel extends Model {
    constructor(defaults: any) {
        super(defaults);
    }
}

/** 
 * A store is a container of all the entries of a given *type*.    For example in a
 * blogging application, it could represent all the `Users`.  
*/
export abstract class Store {

   /**
    * A class method to provide the database access path of a given document
    * 
    * @param the model instance representing the document to locate
    * @returns the database access path of the given document
    */
    static path(model: any): string { /* must override */ throw new Error("Model class does not implement Store"); }
}

/** 
 * @primary is a JavaScript ES7 decorator that indicates that the associated property is a
 * primary key of this model
*/
export function primary(target: any, property: string) {

    Reflect.defineMetadata("primary", true, target, property);
    let primaryKeys = Reflect.getMetadata("primarykeys", target) || [];
    primaryKeys.push(property);

    Reflect.defineMetadata("primarykeys", primaryKeys, target);

}

/** 
 * @observable is a JavaScript ES7 decorator that indicates that the associated property is a
 * GraphStore enhanced observable field;  @besync/GraphStore tracks observers of this field to 
 * automatically subscribe and unsubscribe to the associated document in the persistent store.
*/
export function observable(target: any, propName: string) {
    Reflect.defineMetadata("observable", true, target, propName);

    return Object.defineProperty(target, propName, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (this.$emobx[propName] === undefined) {
                this.$emobx[propName] = enhancedObservable(null, this);
            }
            if (!this.$emobx[propName].toJS) {
                return this.$emobx[propName].get();
            }
            else {
                return this.$emobx[propName].toJS();
            }
        },
        set: function (v) {
            this._isDirty = true;
            if (this.$emobx[propName] !== undefined) {
                if (typeof (v) == 'object' && this.$emobx[propName].merge) {
                    this.$emobx[propName].merge(v);
                }
                else {
                    this.$emobx[propName].set(v);
                }
            }
            else {
                this.$emobx[propName] = enhancedObservable(v, this);
            }
        }
    });
}

/** 
 * @jsonfield is a JavaScript ES7 decorator that indicates that the associated property is a
 * nested JSON object
*/
export function jsonfield(target: any, property: string) {
    Reflect.defineMetadata("jsonfield", true, target, property);
}

/** 
 * @foreign is a JavaScript ES7 decorator that indicates that the associated property is
 * the primary key of another @besync/GraphStore model
*/
export function foreign(target: any, property: string) {
    Reflect.defineMetadata("foreign", true, target, property);
}