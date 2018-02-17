---
id: api-interfaces-igraphstore-igraphstore
title: IGraphStore
sidebar_label: IGraphStore
---

[API](api-readme.md) > [[IGraphStore Module]](api-modules-igraphstore-module.md) > [IGraphStore](api-interfaces-igraphstore-igraphstore.md)



## Interface


A persistent graph store that allows observable fetches and simple updates

The back-end could be a Firebase realtime database, a GraphQL Server, or just memory and disk It is used to abstract the underlying database from GraphStore Model

## Implemented by

* [GraphStore](api-classes-graphstore-graphstore.md)
* [GraphStoreFirebase](api-classes-graphstorefirebase-graphstorefirebase.md)
* [GraphStoreMemory](api-classes-graphstorememory-graphstorememory.md)


## Methods
<a id="observecollection"></a>

###  observeCollection

► **observeCollection**(keys: *`any`*, path: *`string`*, primaryKeys: *`string`[]*, modelCollection: *`IObservableArray`.<`any`>*, modelType: *`any`*): `function`



*Defined in [IGraphStore.ts:47](http://github.com/@besync/graphstore/packages/graphstore/src/IGraphStore.ts#L47)*



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



*Defined in [IGraphStore.ts:35](http://github.com/@besync/graphstore/packages/graphstore/src/IGraphStore.ts#L35)*



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



*Defined in [IGraphStore.ts:58](http://github.com/@besync/graphstore/packages/graphstore/src/IGraphStore.ts#L58)*



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


