---
id: api-classes-graphstorememory-graphstorememory
title: GraphStoreMemory
sidebar_label: GraphStoreMemory
---

[API](api-readme.md) > [[GraphStoreMemory Module]](api-modules-graphstorememory-module.md) > [GraphStoreMemory](api-classes-graphstorememory-graphstorememory.md)



## Class


The implementation of a persistent graph store that uses a JSON object in memory

## Hierarchy


 [GraphStore](api-classes-graphstore-graphstore.md)

**↳ GraphStoreMemory**







## Implements

* [IGraphStore](api-interfaces-igraphstore-igraphstore.md)

### Constructors

* [constructor](api-classes-graphstorememory-graphstorememory.md#constructor)


### Properties

* [db](api-classes-graphstorememory-graphstorememory.md#db)


### Methods

* [observeCollection](api-classes-graphstorememory-graphstorememory.md#observecollection)
* [observeDocument](api-classes-graphstorememory-graphstorememory.md#observedocument)
* [updateDocument](api-classes-graphstorememory-graphstorememory.md#updatedocument)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new GraphStoreMemory**(initialState: *`any`*): [GraphStoreMemory](api-classes-graphstorememory-graphstorememory.md)


*Overrides [GraphStore](api-classes-graphstore-graphstore.md).[constructor](api-classes-graphstore-graphstore.md#constructor)*

*Defined in [GraphStoreMemory.ts:15](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStoreMemory.ts#L15)*



constructor


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| initialState | `any`   |  The initial JSON object to use as the store data |





**Returns:** [GraphStoreMemory](api-classes-graphstorememory-graphstorememory.md)

---


## Properties
<a id="db"></a>

###  db

**●  db**:  *[IFireDatabase](api-interfaces-graphstore-ifiredatabase.md)* 

*Inherited from [GraphStore](api-classes-graphstore-graphstore.md).[db](api-classes-graphstore-graphstore.md#db)*

*Defined in [GraphStore.ts:41](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStore.ts#L41)*





___


## Methods
<a id="observecollection"></a>

###  observeCollection

► **observeCollection**(keys: *`any`*, path: *`string`*, primaryKeys: *`string`[]*, modelCollection: *`IObservableArray`.<`any`>*, modelType: *`any`*): `function`



*Implementation of [IGraphStore](api-interfaces-igraphstore-igraphstore.md).[observeCollection](api-interfaces-igraphstore-igraphstore.md#observecollection)*

*Inherited from [GraphStore](api-classes-graphstore-graphstore.md).[observeCollection](api-classes-graphstore-graphstore.md#observecollection)*

*Defined in [GraphStore.ts:110](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStore.ts#L110)*



Get a collection of database documents (rows) that match a partial primary key set


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| keys | `any`   |  Primary keys to be searched for |
| path | `string`   |  Database path of documents (usually based on keys) |
| primaryKeys | `string`[]   |  Simple list of all primary key names for the expected model |
| modelCollection | `IObservableArray`.<`any`>   |  Observable array to update with the collection and its additions, deletions, and changes over time |
| modelType | `any`   |  constructor to use when adding items to this modelCollection |





**Returns:** `function`
unsubscribe disposer function






___

<a id="observedocument"></a>

###  observeDocument

► **observeDocument**(keys: *`any`*, path: *`string`*, primaryKeys: *`string`[]*, model: *`any`*): `function`



*Implementation of [IGraphStore](api-interfaces-igraphstore-igraphstore.md).[observeDocument](api-interfaces-igraphstore-igraphstore.md#observedocument)*

*Inherited from [GraphStore](api-classes-graphstore-graphstore.md).[observeDocument](api-classes-graphstore-graphstore.md#observedocument)*

*Defined in [GraphStore.ts:61](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStore.ts#L61)*



Get a given database document (row)


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| keys | `any`   |  Primary keys to be searched for |
| path | `string`   |  Database path of document (usually based on keys) |
| primaryKeys | `string`[]   |  Simple list of all primary key names for the expected model |
| model | `any`   |  observable object to update with selected document |





**Returns:** `function`
unsubscribe disposer function






___

<a id="updatedocument"></a>

###  updateDocument

► **updateDocument**(path: *`string`*, primaryKeys: *`string`[]*, update_value: *`any`*, status: *[IGraphStoreStatus](api-interfaces-igraphstore-igraphstorestatus.md)*, deleted: *`boolean`*): `void`



*Implementation of [IGraphStore](api-interfaces-igraphstore-igraphstore.md).[updateDocument](api-interfaces-igraphstore-igraphstore.md#updatedocument)*

*Inherited from [GraphStore](api-classes-graphstore-graphstore.md).[updateDocument](api-classes-graphstore-graphstore.md#updatedocument)*

*Defined in [GraphStore.ts:175](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStore.ts#L175)*



Update or delete the database at the given path


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `string`   |  Database path of document |
| primaryKeys | `string`[]   |  Simple list of all primary key names for the expected model |
| update_value | `any`   |  Value including keys to update |
| status | [IGraphStoreStatus](api-interfaces-igraphstore-igraphstorestatus.md)   |  Status object on which interim status is returned |
| deleted | `boolean`   |  true if the record is to be deleted, false if its to be updated |





**Returns:** `void`





___


