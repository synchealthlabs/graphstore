---
id: guide-get
title: Fetching data
---

Wherever you need a new root document or collection, just use the relevant store functions

```js
let user = stores.UserStore.getbyId(userId)};
```

The `user` object returned is actually an observable object that will stay up to date whenever the state changes (whether within the application or directly on the back end store).

## Traversing the tree structure implicitly

```js
let posts = user.userPosts
```

This will actually lazy-connect to the database to get the associated `UserPosts` for this `User`.  Again the `posts` object in this case is an observable collection that will stay up to date with any added, deleted, or updates posts 


