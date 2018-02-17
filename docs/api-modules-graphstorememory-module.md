---
id: api-modules-graphstorememory-module
title: GraphStoreMemory Module
sidebar_label: GraphStoreMemory
---

[API](api-readme.md) > [[GraphStoreMemory Module]](api-modules-graphstorememory-module.md)



## Module

### Classes

* [GraphStoreMemory](api-classes-graphstorememory-graphstorememory.md)
* [MemoryDatabase](api-classes-graphstorememory-memorydatabase.md)


### Functions

* [deepFind](api-modules-graphstorememory-module.md#deepfind)
* [deepUpdate](api-modules-graphstorememory-module.md#deepupdate)
* [objectToSnapshotArray](api-modules-graphstorememory-module.md#objecttosnapshotarray)
* [subsetFind](api-modules-graphstorememory-module.md#subsetfind)



---
## Functions
<a id="deepfind"></a>

###  deepFind

► **deepFind**(obj: *`any`*, path: *`string`*): `any`



*Defined in [GraphStoreMemory.ts:275](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStoreMemory.ts#L275)*



Private helper function used by MemoryDatabase

Returns the part of an object represent by the given path

For example { level1: { level2: { level3: "result" }, level2b: { level3: "not returned" }}}, "level1/level2" returns { level3: "result" }


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| obj | `any`   |  the JSON object to navigate |
| path | `string`   |  the string representation of the path to return |





**Returns:** `any`
the node of the sub-object represented by the path






___

<a id="deepupdate"></a>

###  deepUpdate

► **deepUpdate**(obj: *`any`*, path: *`string`*, update_value: *`any`*): `boolean`



*Defined in [GraphStoreMemory.ts:341](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStoreMemory.ts#L341)*



Private helper function used by MemoryDatabase

Creates or updates the part of an object represent by the given path


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| obj | `any`   |  the JSON object to navigate |
| path | `string`   |  the string representation of the path to update |
| update_value | `any`   |  the JSON object to create/update at the given location |





**Returns:** `boolean`
true if the item was create, false if was updated






___

<a id="objecttosnapshotarray"></a>

###  objectToSnapshotArray

► **objectToSnapshotArray**(objectToMap: *`any`*): [IFireDatabaseSnapshot](api-interfaces-graphstore-ifiredatabasesnapshot.md)[]



*Defined in [GraphStoreMemory.ts:387](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStoreMemory.ts#L387)*



Private helper function used by MemoryDatabase

Converts an object to an array of sub-objects and returns as an array of {key, val()} objects


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| objectToMap | `any`   |  the JSON object to convert |





**Returns:** [IFireDatabaseSnapshot](api-interfaces-graphstore-ifiredatabasesnapshot.md)[]
An array of {key, val()} objects






___

<a id="subsetfind"></a>

###  subsetFind

► **subsetFind**(obj: *`any`*, path: *`string`*): `any`



*Defined in [GraphStoreMemory.ts:307](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStoreMemory.ts#L307)*



Private helper function used by MemoryDatabase

Returns the part of an object represent by the given path with the root to this node added back in to the result

For example { level1: { level2: { level3: "result" }, level2b: { level3: "not returned" }}}, "level1/level2" returns { level1: { level2: { level3: "result" }}}


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| obj | `any`   |  the JSON object to navigate |
| path | `string`   |  the string representation of the path to return |





**Returns:** `any`
the subset of the entire object represented by this path






___


