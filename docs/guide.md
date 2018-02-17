---
id: guide
title: Installation Guide
sidebar_label: Installation
---

The most common usage of GraphStore is as a persistent store of application state, for example in React or React Native applications.

## Installation

Add to your React project

```bash
npm i -g create-react-app
create-react-app myproject
cd myproject
npm install mobx @besync\graphstore --save
```


## Pre-requisites

It is helpful to understand MobX before using GraphStore.   Ultimately GraphStore just adds some goodies to MobX objects that connects them automatically to a back end persistent store such as Firebase or Mongo Atlas. 

We recommend one of the many MobX introductions:

- [Ten minute introduction to MobX](https://mobx.js.org/getting-started.html)
- [Official MobX reference](https://mobx.js.org/refguide/api.html)

