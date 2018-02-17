---
id: api-interfaces-graphstore-ifiredatabase
title: IFireDatabase
sidebar_label: IFireDatabase
---

[API](api-readme.md) > [[GraphStore Module]](api-modules-graphstore-module.md) > [IFireDatabase](api-interfaces-graphstore-ifiredatabase.md)



## Interface


A persistent store that implements the Firebase Realtime Database V3 API

## Implemented by

* [MemoryDatabase](api-classes-graphstorememory-memorydatabase.md)


## Properties
<a id="gooffline"></a>

###  goOffline

**●  goOffline**:  *`function`* 

*Defined in [GraphStore.ts:29](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStore.ts#L29)*


#### Type declaration
►(): `void`





**Returns:** `void`






___


## Methods
<a id="ref"></a>

###  ref

► **ref**(path: *`string`*): [IFireDatabaseRef](api-interfaces-graphstore-ifiredatabaseref.md)



*Defined in [GraphStore.ts:28](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStore.ts#L28)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `string`   |  - |





**Returns:** [IFireDatabaseRef](api-interfaces-graphstore-ifiredatabaseref.md)





___


