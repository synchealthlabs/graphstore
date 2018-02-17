---
id: api-modules-graphstore-module
title: GraphStore Module
sidebar_label: GraphStore
---

[API](api-readme.md) > [[GraphStore Module]](api-modules-graphstore-module.md)



## Module

### Classes

* [GraphStore](api-classes-graphstore-graphstore.md)


### Interfaces

* [IFireDatabase](api-interfaces-graphstore-ifiredatabase.md)
* [IFireDatabaseRef](api-interfaces-graphstore-ifiredatabaseref.md)
* [IFireDatabaseSnapshot](api-interfaces-graphstore-ifiredatabasesnapshot.md)


### Functions

* [arrayObjecttToFlatArray](api-modules-graphstore-module.md#arrayobjectttoflatarray)
* [flatMap](api-modules-graphstore-module.md#flatmap)



---
## Functions
<a id="arrayobjectttoflatarray"></a>

###  arrayObjecttToFlatArray

► **arrayObjecttToFlatArray**(snapshot: *[IFireDatabaseSnapshot](api-interfaces-graphstore-ifiredatabasesnapshot.md)*, keys: *`any`*, allPrimaryKeys: *`string`[]*): `any`[]



*Defined in [GraphStore.ts:213](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStore.ts#L213)*



Helper function used internally to convert a database complex object to a flat collection of documents


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| snapshot | [IFireDatabaseSnapshot](api-interfaces-graphstore-ifiredatabasesnapshot.md)   |  - |
| keys | `any`   |  - |
| allPrimaryKeys | `string`[]   |  - |





**Returns:** `any`[]





___

<a id="flatmap"></a>

###  flatMap

► **flatMap**(resultArray: *`any`[]*, precedingKeys: *`any`*, objectToMap: *`any`*, allPrimaryKeys: *`string`[]*, currentKey: *`number`*): `void`



*Defined in [GraphStore.ts:232](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStore.ts#L232)*



Helper function used by arrayObjecttToFlatArray to recursively navigate the object


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| resultArray | `any`[]   |  - |
| precedingKeys | `any`   |  - |
| objectToMap | `any`   |  - |
| allPrimaryKeys | `string`[]   |  - |
| currentKey | `number`   |  - |





**Returns:** `void`





___


