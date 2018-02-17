---
id: api-interfaces-graphstore-ifiredatabaseref
title: IFireDatabaseRef
sidebar_label: IFireDatabaseRef
---

[API](api-readme.md) > [[GraphStore Module]](api-modules-graphstore-module.md) > [IFireDatabaseRef](api-interfaces-graphstore-ifiredatabaseref.md)



## Interface


A database reference in a persistent store that implementes the Firebase Realtime Database V3 API


## Properties
<a id="off"></a>

###  off

**●  off**:  *`function`* 

*Defined in [GraphStore.ts:19](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStore.ts#L19)*


#### Type declaration
►(): `void`





**Returns:** `void`






___


## Methods
<a id="on"></a>

###  on

► **on**(eventType: *`string`*, callback: *`any`*): `any`



*Defined in [GraphStore.ts:18](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStore.ts#L18)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventType | `string`   |  - |
| callback | `any`   |  - |





**Returns:** `any`





___

<a id="remove"></a>

###  remove

► **remove**(callback: *`function`*): `any`



*Defined in [GraphStore.ts:21](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStore.ts#L21)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callback | `function`   |  - |





**Returns:** `any`





___

<a id="update"></a>

###  update

► **update**(update_value: *`any`*, callback: *`function`*): `any`



*Defined in [GraphStore.ts:20](http://github.com/@besync/graphstore/packages/graphstore/src/GraphStore.ts#L20)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| update_value | `any`   |  - |
| callback | `function`   |  - |





**Returns:** `any`





___


