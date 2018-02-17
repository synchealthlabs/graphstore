---
id: guide-update
title: Update / Delete / Create Actions
---

GraphStore keeps the backend persistent store up to date with any state changes.   Just remember to wrap them in MobX `actions` if using strict mode.

## Delete / Update

```js 
@action function update() {
  userPosts[1].delete();
  user.name = "GraphStore Expert";
}
```

## Create

GraphStore uses `push` on a collection to create new documents. Just remember to wrap them in MobX `actions` so that you can add all the primary keys etc before the back end store is updated.

```js 
@action function create() {
  var newPost = userPosts.push();
  newPost.id = "-myNewPost";
}
```
