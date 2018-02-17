---
id: api-classes-persistentmodel-model
title: Model
sidebar_label: Model
---

[API](api-readme.md) > [[PersistentModel Module]](api-modules-persistentmodel-module.md) > [Model](api-classes-persistentmodel-model.md)



## Class


A model is a schema of a given type represented in TypeScript or JavaScript. This is where a lot of the magic happens in @besync/GraphStore, as behind the scenes every field is represented as some sort of extended Observable -- a MobX observable with some extra batteries included.

## Hierarchy

**Model**

↳  [Submodel](api-classes-persistentmodel-submodel.md)








## Implements

* [IEnhancedObservableDelegate](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md)

### Constructors

* [constructor](api-classes-persistentmodel-model.md#constructor)


### Properties

* [_isDirty](api-classes-persistentmodel-model.md#_isdirty)
* [exists](api-classes-persistentmodel-model.md#exists)
* [loading](api-classes-persistentmodel-model.md#loading)
* [status](api-classes-persistentmodel-model.md#status)


### Methods

* [addObserver](api-classes-persistentmodel-model.md#addobserver)
* [delete](api-classes-persistentmodel-model.md#delete)
* [keys](api-classes-persistentmodel-model.md#keys)
* [releaseObserver](api-classes-persistentmodel-model.md#releaseobserver)
* [toString](api-classes-persistentmodel-model.md#tostring)
* [getCollection](api-classes-persistentmodel-model.md#getcollection)
* [getDocument](api-classes-persistentmodel-model.md#getdocument)
* [setDefaultStore](api-classes-persistentmodel-model.md#setdefaultstore)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Model**(defaults: *`any`*, graphStore?: *[IGraphStore](api-interfaces-igraphstore-igraphstore.md)*): [Model](api-classes-persistentmodel-model.md)


*Defined in [PersistentModel.ts:43](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L43)*



Constructor


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| defaults | `any`   |  key value dictionary to populate the initial model |
| graphStore | [IGraphStore](api-interfaces-igraphstore-igraphstore.md)   |  - |





**Returns:** [Model](api-classes-persistentmodel-model.md)

---


## Properties
<a id="_isdirty"></a>

###  _isDirty

**●  _isDirty**:  *`boolean`* 

*Defined in [PersistentModel.ts:32](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L32)*





___

<a id="exists"></a>

###  exists

**●  exists**:  *`boolean`*  = true

*Defined in [PersistentModel.ts:27](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L27)*





___

<a id="loading"></a>

###  loading

**●  loading**:  *`boolean`*  = false

*Defined in [PersistentModel.ts:26](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L26)*





___

<a id="status"></a>

###  status

**●  status**:  *[Status](api-classes-persistentmodel-status.md)* 

*Defined in [PersistentModel.ts:28](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L28)*





___


## Methods
<a id="addobserver"></a>

###  addObserver

► **addObserver**(): `void`



*Implementation of [IEnhancedObservableDelegate](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md).[addObserver](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md#addobserver)*

*Defined in [PersistentModel.ts:106](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L106)*



IEnhancedObservableDelegate.addObserver

Used internally by @besync/GraphStore to indicate when the first new observer is watching this collection




**Returns:** `void`





___

<a id="delete"></a>

###  delete

► **delete**(): `void`



*Defined in [PersistentModel.ts:96](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L96)*



Deletes this document from the store




**Returns:** `void`





___

<a id="keys"></a>

###  keys

► **keys**(): `string`[]



*Defined in [PersistentModel.ts:173](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L173)*



Get the keys of this model, including both owned properties and those managed by @besync/GraphStore




**Returns:** `string`[]
List of keys as a string array






___

<a id="releaseobserver"></a>

###  releaseObserver

► **releaseObserver**(): `void`



*Implementation of [IEnhancedObservableDelegate](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md).[releaseObserver](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md#releaseobserver)*

*Defined in [PersistentModel.ts:117](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L117)*



IEnhancedObservableDelegate.addObserver

Used internally by @besync/GraphStore to indicate when no more observers are watching this collection




**Returns:** `void`





___

<a id="tostring"></a>

###  toString

► **toString**(): `string`



*Defined in [PersistentModel.ts:183](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L183)*



Gets a string representation of this model in JSON format, useful for debugging purposes




**Returns:** `string`
string representation of this model in JSON format






___

<a id="getcollection"></a>

### «Static» getCollection

► **getCollection**(keys: *`any`*, path: *`string`*): `any`[]



*Defined in [PersistentModel.ts:224](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L224)*



Class method to get an observable collection of documents from the default persistent store
*__param:__*: path A string representing the database access path to the location of the collection



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| keys | `any`   |  A key:value dictionary representing the subset of primary keys to query on |
| path | `string`   |  - |





**Returns:** `any`[]
An instance of this model that can be observed over time to represent the selected document






___

<a id="getdocument"></a>

### «Static» getDocument

► **getDocument**(keys: *`any`*, path: *`string`*): `any`



*Defined in [PersistentModel.ts:203](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L203)*



Class method to get an observable document from the default persistent store
*__param:__*: path A string representing the database access path to the location of the document



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| keys | `any`   |  A key:value dictionary representing the primary keys to query on |
| path | `string`   |  - |





**Returns:** `any`
An instance of this model that can be observed over time to represent the selected document






___

<a id="setdefaultstore"></a>

### «Static» setDefaultStore

► **setDefaultStore**(graphStore: *[IGraphStore](api-interfaces-igraphstore-igraphstore.md)*): `void`



*Defined in [PersistentModel.ts:192](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModel.ts#L192)*



Class method to set the default persistent store for all instances of this model type


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| graphStore | [IGraphStore](api-interfaces-igraphstore-igraphstore.md)   |  the default persistent store |





**Returns:** `void`





___


