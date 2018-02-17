---
id: api-interfaces-persistentmodelobservable-ienhancedobservablearray
title: IEnhancedObservableArray
sidebar_label: IEnhancedObservableArray
---

[API](api-readme.md) > [[PersistentModelObservable Module]](api-modules-persistentmodelobservable-module.md) > [IEnhancedObservableArray](api-interfaces-persistentmodelobservable-ienhancedobservablearray.md)



## Interface


An observable collection in @besync/GraphStore; it extends the MobX observable array with some additional properties

## Type parameters
#### T 
## Hierarchy


 `IObservableArray`.<`T`>

**↳ IEnhancedObservableArray**







## Indexable

\[n: `number`\]:&nbsp;`T`
An observable collection in @besync/GraphStore; it extends the MobX observable array with some additional properties



## Properties
<a id="_emobx"></a>

###  $emobx

**●  $emobx**:  *`any`* 

*Defined in [PersistentModelObservable.ts:27](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L27)*



Used internally by @besync/GraphStore; not an authorized public API




___

<a id="exists"></a>

###  exists

**●  exists**:  *`boolean`* 

*Defined in [PersistentModelObservable.ts:17](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L17)*



Indicates if this collection was found in the persistent store




___

<a id="length"></a>

###  length

**●  length**:  *`number`* 

*Inherited from Array.length*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1114](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1114)*



Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.




___

<a id="loading"></a>

###  loading

**●  loading**:  *`boolean`* 

*Defined in [PersistentModelObservable.ts:12](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L12)*



Indicates if this collection is currently being retrieved from the persistent store




___


## Methods
<a id="clear"></a>

###  clear

► **clear**(): `T`[]



*Inherited from IObservableArray.clear*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts:10](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts#L10)*





**Returns:** `T`[]





___

<a id="concat"></a>

###  concat

► **concat**(...items: *(`T`[]⎮`ReadonlyArray`.<`T`>)[]*): `T`[]

► **concat**(...items: *(`T`[]⎮`T`⎮`ReadonlyArray`.<`T`>)[]*): `T`[]



*Inherited from Array.concat*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1136](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1136)*



Combines two or more arrays.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| items | (`T`[]⎮`ReadonlyArray`.<`T`>)[]   |  Additional items to add to the end of array1. |





**Returns:** `T`[]



*Inherited from Array.concat*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1141](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1141)*



Combines two or more arrays.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| items | (`T`[]⎮`T`⎮`ReadonlyArray`.<`T`>)[]   |  Additional items to add to the end of array1. |





**Returns:** `T`[]





___

<a id="create"></a>

###  create

► **create**(): `T`



*Defined in [PersistentModelObservable.ts:22](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L22)*



Factory method to create a new document in the collection




**Returns:** `T`





___

<a id="every"></a>

###  every

► **every**(callbackfn: *`function`*, thisArg?: *`any`*): `boolean`



*Inherited from Array.every*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1201](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1201)*



Determines whether all the members of an array satisfy the specified test.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function`   |  A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array. |
| thisArg | `any`   |  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |





**Returns:** `boolean`





___

<a id="filter"></a>

###  filter

► **filter**S(callbackfn: *`function`*, thisArg?: *`any`*): `S`[]

► **filter**(callbackfn: *`function`*, thisArg?: *`any`*): `T`[]



*Inherited from Array.filter*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1225](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1225)*



Returns the elements of an array that meet the condition specified in a callback function.


**Type parameters:**

#### S :  `T`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function`   |  A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array. |
| thisArg | `any`   |  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |





**Returns:** `S`[]



*Inherited from Array.filter*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1231](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1231)*



Returns the elements of an array that meet the condition specified in a callback function.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function`   |  A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array. |
| thisArg | `any`   |  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |





**Returns:** `T`[]





___

<a id="find"></a>

###  find

► **find**(predicate: *`function`*, thisArg?: *`any`*, fromIndex?: *`number`*): `T`⎮`undefined`



*Inherited from IObservableArray.find*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts:13](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts#L13)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| predicate | `function`   |  - |
| thisArg | `any`   |  - |
| fromIndex | `number`   |  - |





**Returns:** `T`⎮`undefined`





___

<a id="findindex"></a>

###  findIndex

► **findIndex**(predicate: *`function`*, thisArg?: *`any`*, fromIndex?: *`number`*): `number`



*Inherited from IObservableArray.findIndex*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts:14](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts#L14)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| predicate | `function`   |  - |
| thisArg | `any`   |  - |
| fromIndex | `number`   |  - |





**Returns:** `number`





___

<a id="foreach"></a>

###  forEach

► **forEach**(callbackfn: *`function`*, thisArg?: *`any`*): `void`



*Inherited from Array.forEach*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1213](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1213)*



Performs the specified action for each element in an array.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function`   |  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array. |
| thisArg | `any`   |  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |





**Returns:** `void`





___

<a id="indexof"></a>

###  indexOf

► **indexOf**(searchElement: *`T`*, fromIndex?: *`number`*): `number`



*Inherited from Array.indexOf*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1189](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1189)*



Returns the index of the first occurrence of a value in an array.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| searchElement | `T`   |  The value to locate in the array. |
| fromIndex | `number`   |  The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0. |





**Returns:** `number`





___

<a id="intercept"></a>

###  intercept

► **intercept**(handler: *`IInterceptor`.<`IArrayWillChange`.<`T`>⎮`IArrayWillSplice`.<`T`>>*): `Lambda`

► **intercept**(handler: *`IInterceptor`.<`IArrayChange`.<`T`>⎮`IArraySplice`.<`T`>>*): `Lambda`

► **intercept**T(handler: *`IInterceptor`.<`IArrayChange`.<`T`>⎮`IArraySplice`.<`T`>>*): `Lambda`



*Inherited from IObservableArray.intercept*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts:7](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts#L7)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| handler | `IInterceptor`.<`IArrayWillChange`.<`T`>⎮`IArrayWillSplice`.<`T`>>   |  - |





**Returns:** `Lambda`



*Inherited from IObservableArray.intercept*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts:8](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts#L8)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| handler | `IInterceptor`.<`IArrayChange`.<`T`>⎮`IArraySplice`.<`T`>>   |  - |





**Returns:** `Lambda`



*Inherited from IObservableArray.intercept*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts:9](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts#L9)*



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| handler | `IInterceptor`.<`IArrayChange`.<`T`>⎮`IArraySplice`.<`T`>>   |  - |





**Returns:** `Lambda`





___

<a id="join"></a>

###  join

► **join**(separator?: *`string`*): `string`



*Inherited from Array.join*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1146](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1146)*



Adds all the elements of an array separated by the specified separator string.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| separator | `string`   |  A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma. |





**Returns:** `string`





___

<a id="lastindexof"></a>

###  lastIndexOf

► **lastIndexOf**(searchElement: *`T`*, fromIndex?: *`number`*): `number`



*Inherited from Array.lastIndexOf*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1195](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1195)*



Returns the index of the last occurrence of a specified value in an array.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| searchElement | `T`   |  The value to locate in the array. |
| fromIndex | `number`   |  The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array. |





**Returns:** `number`





___

<a id="map"></a>

###  map

► **map**U(callbackfn: *`function`*, thisArg?: *`any`*): `U`[]



*Inherited from Array.map*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1219](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1219)*



Calls a defined callback function on each element of an array, and returns an array that contains the results.


**Type parameters:**

#### U 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function`   |  A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. |
| thisArg | `any`   |  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |





**Returns:** `U`[]





___

<a id="move"></a>

###  move

► **move**(fromIndex: *`number`*, toIndex: *`number`*): `void`



*Inherited from IObservableArray.move*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts:16](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts#L16)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fromIndex | `number`   |  - |
| toIndex | `number`   |  - |





**Returns:** `void`





___

<a id="observe"></a>

###  observe

► **observe**(listener: *`function`*, fireImmediately?: *`boolean`*): `Lambda`



*Inherited from IObservableArray.observe*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts:6](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts#L6)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| listener | `function`   |  - |
| fireImmediately | `boolean`   |  - |





**Returns:** `Lambda`





___

<a id="peek"></a>

###  peek

► **peek**(): `T`[]



*Inherited from IObservableArray.peek*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts:11](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts#L11)*





**Returns:** `T`[]





___

<a id="pop"></a>

###  pop

► **pop**(): `T`⎮`undefined`



*Inherited from Array.pop*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1131](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1131)*



Removes the last element from an array and returns it.




**Returns:** `T`⎮`undefined`





___

<a id="push"></a>

###  push

► **push**(...items: *`T`[]*): `number`



*Inherited from Array.push*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1127](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1127)*



Appends new elements to an array, and returns the new length of the array.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| items | `T`[]   |  New elements of the Array. |





**Returns:** `number`





___

<a id="reduce"></a>

###  reduce

► **reduce**(callbackfn: *`function`*): `T`

► **reduce**(callbackfn: *`function`*, initialValue: *`T`*): `T`

► **reduce**U(callbackfn: *`function`*, initialValue: *`U`*): `U`



*Inherited from Array.reduce*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1237](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1237)*



Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function`   |  A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |





**Returns:** `T`



*Inherited from Array.reduce*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1238](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1238)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function`   |  - |
| initialValue | `T`   |  - |





**Returns:** `T`



*Inherited from Array.reduce*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1244](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1244)*



Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.


**Type parameters:**

#### U 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function`   |  A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |
| initialValue | `U`   |  If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |





**Returns:** `U`





___

<a id="reduceright"></a>

###  reduceRight

► **reduceRight**(callbackfn: *`function`*): `T`

► **reduceRight**(callbackfn: *`function`*, initialValue: *`T`*): `T`

► **reduceRight**U(callbackfn: *`function`*, initialValue: *`U`*): `U`



*Inherited from Array.reduceRight*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1250](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1250)*



Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function`   |  A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. |





**Returns:** `T`



*Inherited from Array.reduceRight*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1251](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1251)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function`   |  - |
| initialValue | `T`   |  - |





**Returns:** `T`



*Inherited from Array.reduceRight*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1257](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1257)*



Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.


**Type parameters:**

#### U 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function`   |  A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. |
| initialValue | `U`   |  If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |





**Returns:** `U`





___

<a id="remove"></a>

###  remove

► **remove**(value: *`T`*): `boolean`



*Inherited from IObservableArray.remove*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts:15](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts#L15)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `T`   |  - |





**Returns:** `boolean`





___

<a id="replace"></a>

###  replace

► **replace**(newItems: *`T`[]*): `T`[]



*Inherited from IObservableArray.replace*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts:12](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts#L12)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| newItems | `T`[]   |  - |





**Returns:** `T`[]





___

<a id="reverse"></a>

###  reverse

► **reverse**(): `T`[]



*Inherited from Array.reverse*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1150](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1150)*



Reverses the elements in an Array.




**Returns:** `T`[]





___

<a id="shift"></a>

###  shift

► **shift**(): `T`⎮`undefined`



*Inherited from Array.shift*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1154](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1154)*



Removes the first element from an array and returns it.




**Returns:** `T`⎮`undefined`





___

<a id="slice"></a>

###  slice

► **slice**(start?: *`number`*, end?: *`number`*): `T`[]



*Inherited from Array.slice*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1160](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1160)*



Returns a section of an array.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| start | `number`   |  The beginning of the specified portion of the array. |
| end | `number`   |  The end of the specified portion of the array. |





**Returns:** `T`[]





___

<a id="some"></a>

###  some

► **some**(callbackfn: *`function`*, thisArg?: *`any`*): `boolean`



*Inherited from Array.some*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1207](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1207)*



Determines whether the specified callback function returns true for any element of an array.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function`   |  A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array. |
| thisArg | `any`   |  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |





**Returns:** `boolean`





___

<a id="sort"></a>

###  sort

► **sort**(compareFn?: *`function`*): `this`



*Inherited from Array.sort*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1165](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1165)*



Sorts an array.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| compareFn | `function`   |  The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order. |





**Returns:** `this`





___

<a id="splice"></a>

###  splice

► **splice**(start: *`number`*, deleteCount?: *`number`*): `T`[]

► **splice**(start: *`number`*, deleteCount: *`number`*, ...items: *`T`[]*): `T`[]



*Inherited from Array.splice*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1171](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1171)*



Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| start | `number`   |  The zero-based location in the array from which to start removing elements. |
| deleteCount | `number`   |  The number of elements to remove. |





**Returns:** `T`[]



*Inherited from Array.splice*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1178](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1178)*



Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| start | `number`   |  The zero-based location in the array from which to start removing elements. |
| deleteCount | `number`   |  The number of elements to remove. |
| items | `T`[]   |  Elements to insert into the array in place of the deleted elements. |





**Returns:** `T`[]





___

<a id="splicewitharray"></a>

###  spliceWithArray

► **spliceWithArray**(index: *`number`*, deleteCount?: *`number`*, newItems?: *`T`[]*): `T`[]



*Inherited from IObservableArray.spliceWithArray*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts:5](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/mobx/lib/types/observablearray.d.ts#L5)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number`   |  - |
| deleteCount | `number`   |  - |
| newItems | `T`[]   |  - |





**Returns:** `T`[]





___

<a id="tolocalestring"></a>

###  toLocaleString

► **toLocaleString**(): `string`



*Inherited from Array.toLocaleString*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1122](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1122)*



Returns a string representation of an array. The elements are converted to string using thier toLocalString methods.




**Returns:** `string`





___

<a id="tostring"></a>

###  toString

► **toString**(): `string`



*Inherited from Array.toString*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1118](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1118)*



Returns a string representation of an array.




**Returns:** `string`





___

<a id="unshift"></a>

###  unshift

► **unshift**(...items: *`T`[]*): `number`



*Inherited from Array.unshift*

*Defined in [/Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts:1183](http://github.com/@besync/graphstore/packages/graphstore/src//Volumes/DATA/projects/graphstore/node_modules/typedoc/node_modules/typescript/lib/lib.es6.d.ts#L1183)*



Inserts new elements at the start of an array.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| items | `T`[]   |  Elements to insert at the start of the Array. |





**Returns:** `number`





___


