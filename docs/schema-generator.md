---
id: schema-generator
title: Generating the Schema
---
[`@besync/graphstore-dev`](https://github.com/besync/graphstore-dev) contains several automatic code generators.  It includes generator that parses a raw Firebase database export and creates a GraphQL Schema that can be used as the basis for a GraphStore.

> ## Non-production prototype
> Note: The Firebase parser is a working prototype that was created to work off a single staging database.   It will likely require some debugging and editing of the code generation to work for your database.


## Example input

Below is just the raw JSON exported from the Firebase console.  It happens to be Firebase but in theory any JSON object that represents the data in your database could be used to seed the schema generation.


```json
 "users": {
    "google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0": {
      "email": "demo@email.com",
      "profile_picture": "https://lh4.googleusercontent.com/-asdsdad/AAAAAAAAAAI/AAAAAAAAAJY/dfqq8tfiGoA/photo.jpg",
      "username": "Demo User"
    }
  }
```

## Command Line Usage (Firebase Json to GraphQL)

``` bash
graphstore-dev firebase data/db-export.json build/schema.graphql
```


## Alternative API to execute the generator from Javascript Node.js or equivalent application

``` js
const importJsonExportGraphQl = require('@besync/graphstore-dev').importJsonExportGraphQl,
    importGraphQl = require('@besync/graphstore-dev').importGraphQl,
    exportModelTs = require('@besync/graphstore-dev').exportModelTs;

var inputfile = path.resolve(__dirname, "../data/db-export.json");
var graphQLFile = path.resolve(__dirname, "../build/schema.graphql");

createDirectories(graphQLFile);
importJsonExportGraphQl(inputfile, graphQLFile);
```
