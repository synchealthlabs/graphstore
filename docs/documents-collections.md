---
id: documents-collections
title: Documents and Collections
---

We find most database patterns are about working with single *documents* or lists of documents that we call *collections*.

> Ultimately the GraphStore API surface is limited to `getDocument`, `getCollection` and `updateDocument`, and then some extra observable logic embedded behind the scenes to every property in `Model`s and `ModelCollection`s. 

## Documents

In GraphStore, data (or application state) is stored in *documents*.  Each document contains a set of key-value pairs. Many NoSQL databases are optimized for storing large collections of small documents.  

Below is an example of a single Google User Document (`google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0"`) within a `users` Store collection.

```json
  "users": {
    "google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0": {
      "email": "demo@email.com",
      "profile_picture": "https://lh4.googleusercontent.com/-asdsdad/AAAAAAAAAAI/AAAAAAAAAJY/dfqq8tfiGoA/photo.jpg",
      "username": "Demo User"
    }
  }
  ```

>For JSON-based databases like the Firebase Realtime Database, GraphStore considers a document to be any object within the large data structure that can be uniquely identified by a set of primary keys.

All documents are organized in collections.  A store for each type of document contains one or functions for getting all the documents of that type and filtered collections of documents of that type.  

Documents can contain subcollections and nested objects, both of which can include primitive fields like strings or complex objects like lists.

## Collections

In GraphStore, Collections are simply lists of related documents. The documents may be related on the basis of actually beings stored in the same collection (or table) on the same backend database, or may be the result of an observable query based on navigating the object graph or joining one or more database tables. 