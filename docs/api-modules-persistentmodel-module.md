---
id: api-modules-persistentmodel-module
title: PersistentModel Module
sidebar_label: PersistentModel
---

[API](api-readme.md) > [[PersistentModel Module]](api-modules-persistentmodel-module.md)



## Module

### Classes

* [Model](api-classes-persistentmodel-model.md)
* [ModelCollection](api-classes-persistentmodel-modelcollection.md)
* [Status](api-classes-persistentmodel-status.md)
* [Store](api-classes-persistentmodel-store.md)
* [Submodel](api-classes-persistentmodel-submodel.md)


### Functions

* [foreign](api-modules-persistentmodel-module.md#foreign)
* [jsonfield](api-modules-persistentmodel-module.md#jsonfield)
* [observable](api-modules-persistentmodel-module.md#observable)
* [primary](api-modules-persistentmodel-module.md#primary)



---
## Functions
<a id="foreign"></a>

###  foreign

► **foreign**(target: *`any`*, property: *`string`*): `void`



*Defined in [PersistentModel.ts:402](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L402)*


*__foreign__*: is a JavaScript ES7 decorator that indicates that the associated property is the primary key of another @besync/GraphStore model



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| target | `any`   |  - |
| property | `string`   |  - |





**Returns:** `void`





___

<a id="jsonfield"></a>

###  jsonfield

► **jsonfield**(target: *`any`*, property: *`string`*): `void`



*Defined in [PersistentModel.ts:394](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L394)*


*__jsonfield__*: is a JavaScript ES7 decorator that indicates that the associated property is a nested JSON object



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| target | `any`   |  - |
| property | `string`   |  - |





**Returns:** `void`





___

<a id="observable"></a>

###  observable

► **observable**(target: *`any`*, propName: *`string`*): `any`



*Defined in [PersistentModel.ts:359](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L359)*


*__observable__*: is a JavaScript ES7 decorator that indicates that the associated property is a GraphStore enhanced observable field; @besync/GraphStore tracks observers of this field to automatically subscribe and unsubscribe to the associated document in the persistent store.



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| target | `any`   |  - |
| propName | `string`   |  - |





**Returns:** `any`





___

<a id="primary"></a>

###  primary

► **primary**(target: *`any`*, property: *`string`*): `void`



*Defined in [PersistentModel.ts:344](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L344)*


*__primary__*: is a JavaScript ES7 decorator that indicates that the associated property is a primary key of this model



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| target | `any`   |  - |
| property | `string`   |  - |





**Returns:** `void`





___


