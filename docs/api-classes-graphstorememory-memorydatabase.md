---
id: api-classes-graphstorememory-memorydatabase
title: MemoryDatabase
sidebar_label: MemoryDatabase
---

[API](api-readme.md) > [[GraphStoreMemory Module]](api-modules-graphstorememory-module.md) > [MemoryDatabase](api-classes-graphstorememory-memorydatabase.md)



## Class


An in memory database that implements the minimum viable Firebase Realtime Database V3 API

Not typically used outside GraphStoreMemory but provided in case it's useful for mocking tests or applications outside of @besync/GraphSTore

## Implements

* [IFireDatabase](api-interfaces-graphstore-ifiredatabase.md)

### Constructors

* [constructor](api-classes-graphstorememory-memorydatabase.md#constructor)


### Methods

* [goOffline](api-classes-graphstorememory-memorydatabase.md#gooffline)
* [ref](api-classes-graphstorememory-memorydatabase.md#ref)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new MemoryDatabase**(data: *`any`*): [MemoryDatabase](api-classes-graphstorememory-memorydatabase.md)


*Defined in [GraphStoreMemory.ts:38](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStoreMemory.ts#L38)*



constructor


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  The initial JSON object to use as the store data |





**Returns:** [MemoryDatabase](api-classes-graphstorememory-memorydatabase.md)

---


## Methods
<a id="gooffline"></a>

###  goOffline

► **goOffline**(): `void`



*Defined in [GraphStoreMemory.ts:112](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStoreMemory.ts#L112)*





**Returns:** `void`





___

<a id="ref"></a>

###  ref

► **ref**(path: *`string`*): `object`



*Implementation of [IFireDatabase](api-interfaces-graphstore-ifiredatabase.md).[ref](api-interfaces-graphstore-ifiredatabase.md#ref)*

*Defined in [GraphStoreMemory.ts:49](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStoreMemory.ts#L49)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `string`   |  - |





**Returns:** `object`





___


