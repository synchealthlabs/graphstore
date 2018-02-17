---
id: api-modules-persistentmodelobservable-module
title: PersistentModelObservable Module
sidebar_label: PersistentModelObservable
---

[API](api-readme.md) > [[PersistentModelObservable Module]](api-modules-persistentmodelobservable-module.md)



## Module

### Interfaces

* [IEnhancedObservableArray](api-interfaces-persistentmodelobservable-ienhancedobservablearray.md)
* [IEnhancedObservableDelegate](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md)


### Functions

* [enhancedObservable](api-modules-persistentmodelobservable-module.md#enhancedobservable)
* [enhancedObservableArray](api-modules-persistentmodelobservable-module.md#enhancedobservablearray)
* [isEnhancedObservable](api-modules-persistentmodelobservable-module.md#isenhancedobservable)
* [isEnhancedObservableArray](api-modules-persistentmodelobservable-module.md#isenhancedobservablearray)
* [makeNonEnumerable](api-modules-persistentmodelobservable-module.md#makenonenumerable)
* [push](api-modules-persistentmodelobservable-module.md#push)
* [toJS](api-modules-persistentmodelobservable-module.md#tojs)
* [toJS_Primary](api-modules-persistentmodelobservable-module.md#tojs_primary)
* [toJS_Tracked](api-modules-persistentmodelobservable-module.md#tojs_tracked)
* [toJS_nonPrimary](api-modules-persistentmodelobservable-module.md#tojs_nonprimary)



---
## Functions
<a id="enhancedobservable"></a>

###  enhancedObservable

► **enhancedObservable**(data: *`any`*, delegate: *[IEnhancedObservableDelegate](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md)*): `any`



*Defined in [PersistentModelObservable.ts:58](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L58)*



Factory to create a new MobX observable field that has the additional magic of @besync/GraphStore to notify when any observed field in the document is under active observation


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  The object of the given document to become observable |
| delegate | [IEnhancedObservableDelegate](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md)   |  The document owner that will receive @besync/GraphStore observation notifications |





**Returns:** `any`





___

<a id="enhancedobservablearray"></a>

###  enhancedObservableArray

► **enhancedObservableArray**(delegate: *[IEnhancedObservableDelegate](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md)*): [IEnhancedObservableArray](api-interfaces-persistentmodelobservable-ienhancedobservablearray.md)`any`



*Defined in [PersistentModelObservable.ts:97](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L97)*



Factory to create a new MobX observable array that has the additional magic of @besync/GraphStore to notify when the collection is under active observation, and with loading, exists properties


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| delegate | [IEnhancedObservableDelegate](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md)   |  The document owner that will receive @besync/GraphStore observation notifications |





**Returns:** [IEnhancedObservableArray](api-interfaces-persistentmodelobservable-ienhancedobservablearray.md)`any`





___

<a id="isenhancedobservable"></a>

###  isEnhancedObservable

► **isEnhancedObservable**(thing: *`any`*): `boolean`



*Defined in [PersistentModelObservable.ts:162](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L162)*



Helper method to determine if an object is a @besync/GraphStore Enhanced MobX observable document


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| thing | `any`   |  the object to test |





**Returns:** `boolean`





___

<a id="isenhancedobservablearray"></a>

###  isEnhancedObservableArray

► **isEnhancedObservableArray**(thing: *`any`*): `boolean`



*Defined in [PersistentModelObservable.ts:153](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L153)*



Helper method to determine if an object is a @besync/GraphStore Enhanced MobX observable collection


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| thing | `any`   |  the object to test |





**Returns:** `boolean`





___

<a id="makenonenumerable"></a>

###  makeNonEnumerable

► **makeNonEnumerable**(obj: *`any`*, ...names: *`any`[]*): `void`



*Defined in [PersistentModelObservable.ts:263](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L263)*



Helper method used internally by @besync/GraphStore to hide all the private properties of a Model from enumeration, Object.keys(), .map(), etc.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| obj | `any`   |  - |
| names | `any`[]   |  - |





**Returns:** `void`





___

<a id="push"></a>

###  push

► **push**T(source: *[IEnhancedObservableArray](api-interfaces-persistentmodelobservable-ienhancedobservablearray.md)`T`*): `T`



*Defined in [PersistentModelObservable.ts:245](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L245)*



Factory method to create a new document in a collection


**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| source | [IEnhancedObservableArray](api-interfaces-persistentmodelobservable-ienhancedobservablearray.md)`T`   |  the collection |





**Returns:** `T`





___

<a id="tojs"></a>

###  toJS

► **toJS**T(source: *`T`*, detectCycles?: *`boolean`*): `T`

► **toJS**(source: *`any`*, detectCycles?: *`boolean`*): `any`

► **toJS**(source: *`any`*, detectCycles: *`boolean`*, __alreadySeen: *[`any`,`any`][]*): `any`



*Defined in [PersistentModelObservable.ts:175](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L175)*



Recursively converts an (enhanced or non-enhanced observable) object to a javascript structure. Supports observable arrays, objects, maps and primitives. Computed values and other non-enumerable properties won't be part of the result. Cycles are detected and properly supported by default, but this can be disabled to improve performance.


**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| source | `T`   |  the MobX observable |
| detectCycles | `boolean`   |  default true |





**Returns:** `T`



*Defined in [PersistentModelObservable.ts:176](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L176)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| source | `any`   |  - |
| detectCycles | `boolean`   |  - |





**Returns:** `any`



*Defined in [PersistentModelObservable.ts:177](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L177)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| source | `any`   |  - |
| detectCycles | `boolean`   |  - |
| __alreadySeen | [`any`,`any`][]   |  - |





**Returns:** `any`





___

<a id="tojs_primary"></a>

###  toJS_Primary

► **toJS_Primary**(source: *`any`*, primaryKeys: *`string`[]*): `any`



*Defined in [PersistentModelObservable.ts:231](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L231)*



Like toJS but only includes the Primary key fields in the resultant object


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| source | `any`   |  the MobX observable |
| primaryKeys | `string`[]   |  the list of primary keys to include |





**Returns:** `any`





___

<a id="tojs_tracked"></a>

###  toJS_Tracked

► **toJS_Tracked**(source: *`any`*): `any`



*Defined in [PersistentModelObservable.ts:216](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L216)*



Like toJS but only includes the @beysnc/GraphStore tracked fields in the resultant object


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| source | `any`   |  the MobX observable |





**Returns:** `any`





___

<a id="tojs_nonprimary"></a>

###  toJS_nonPrimary

► **toJS_nonPrimary**(source: *`any`*, primaryKeys: *`string`[]*): `any`



*Defined in [PersistentModelObservable.ts:202](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L202)*



Like toJS but only includes the non Primary key fields in the resultant object


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| source | `any`   |  the MobX observable |
| primaryKeys | `string`[]   |  the list of primary keys to exclude |





**Returns:** `any`





___


