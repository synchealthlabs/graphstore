---
id: api-classes-persistentmodel-modelcollection
title: ModelCollection
sidebar_label: ModelCollection
---

[API](api-readme.md) > [[PersistentModel Module]](api-modules-persistentmodel-module.md) > [ModelCollection](api-classes-persistentmodel-modelcollection.md)



## Class


In @besync/GraphStore, Collections are simply lists of related documents. The documents may be related on the basis of actually beings stored in the same collection (or table) on the same backend database, or may be the result of an observable query based on navigating the object graph or joining one or more database tables.

## Implements

* [IEnhancedObservableDelegate](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md)

### Constructors

* [constructor](api-classes-persistentmodel-modelcollection.md#constructor)


### Accessors

* [observable](api-classes-persistentmodel-modelcollection.md#observable)


### Methods

* [addObserver](api-classes-persistentmodel-modelcollection.md#addobserver)
* [releaseObserver](api-classes-persistentmodel-modelcollection.md#releaseobserver)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new ModelCollection**(modelType: *`any`*, keys: *`any`*, path: *`string`*, graphStore: *[IGraphStore](api-interfaces-igraphstore-igraphstore.md)*): [ModelCollection](api-classes-persistentmodel-modelcollection.md)


*Defined in [PersistentModel.ts:245](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L245)*



Constructor, usually called internally by @besync/GraphStore


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| modelType | `any`   |  the constructor function to use when creating new documents in the collection |
| keys | `any`   |  A key:value dictionary representing the common subset of primary keys for this collection |
| path | `string`   |  A string representing the database access path to the location of the collection |
| graphStore | [IGraphStore](api-interfaces-igraphstore-igraphstore.md)   |  The persistent store where this collection exists |





**Returns:** [ModelCollection](api-classes-persistentmodel-modelcollection.md)

---


## Accessors
<a id="observable"></a>

###  observable


getobservable(): [IEnhancedObservableArray](api-interfaces-persistentmodelobservable-ienhancedobservablearray.md)`any`

*Defined in [PersistentModel.ts:287](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L287)*



Returns the observable MobX array that represents the data in this collection




**Returns:** [IEnhancedObservableArray](api-interfaces-persistentmodelobservable-ienhancedobservablearray.md)`any`
the MobX observable array




___


## Methods
<a id="addobserver"></a>

###  addObserver

► **addObserver**(): `void`



*Implementation of [IEnhancedObservableDelegate](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md).[addObserver](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md#addobserver)*

*Defined in [PersistentModel.ts:296](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L296)*



IEnhancedObservableDelegate.addObserver

Used internally by @besync/GraphStore to indicate when the first new observer is watching this collection




**Returns:** `void`





___

<a id="releaseobserver"></a>

###  releaseObserver

► **releaseObserver**(): `void`



*Implementation of [IEnhancedObservableDelegate](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md).[releaseObserver](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md#releaseobserver)*

*Defined in [PersistentModel.ts:305](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L305)*



IEnhancedObservableDelegate.releaseObserver

Used internally by @besync/GraphStore to indicate when no more observers are watching this collection




**Returns:** `void`





___


