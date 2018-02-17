---
id: api-interfaces-persistentmodelobservable-ienhancedobservabledelegate
title: IEnhancedObservableDelegate
sidebar_label: IEnhancedObservableDelegate
---

[API](api-readme.md) > [[PersistentModelObservable Module]](api-modules-persistentmodelobservable-module.md) > [IEnhancedObservableDelegate](api-interfaces-persistentmodelobservable-ienhancedobservabledelegate.md)



## Interface


Used internally by @besync/GraphStore on Models and Collections to notify when any observed field in the document or collection is under active observation

## Implemented by

* [Model](api-classes-persistentmodel-model.md)
* [ModelCollection](api-classes-persistentmodel-modelcollection.md)
* [Submodel](api-classes-persistentmodel-submodel.md)


## Methods
<a id="addobserver"></a>

###  addObserver

► **addObserver**(): `void`



*Defined in [PersistentModelObservable.ts:41](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L41)*



IEnhancedObservableDelegate.addObserver

Used internally by @besync/GraphStore to indicate when the first new observer is watching this collection




**Returns:** `void`





___

<a id="releaseobserver"></a>

###  releaseObserver

► **releaseObserver**(): `void`



*Defined in [PersistentModelObservable.ts:48](http://github.com/@besync/graphstore/packages/graphstore/src/PersistentModelObservable.ts#L48)*



IEnhancedObservableDelegate.addObserver

Used internally by @besync/GraphStore to indicate when no more observers are watching this collection




**Returns:** `void`





___


