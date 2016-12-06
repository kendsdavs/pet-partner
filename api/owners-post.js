///POST /owners

{
  "lastName": "Davis",
  "firstName": "Kendra",
  "address": "123 Elm St., Mt. Pleasant, SC 29464",
  "phone": "232-594-3332",
  "email": "kends@kends.name"
}

///GET /owners
///Couch gives us everything below.  We only want the 'doc' array
///so we must model the API to get that.

{
  "rows":[
    "doc":
    {
      "_id": "owner_davis_kends@kends.name",
      "_rev": "1-1249235082058"
      "type": "owner",
      "lastName": "Davis",
      "firstName": "Kendra",
      "address": "123 Elm St., Mt. Pleasant, SC 29464",
      "phone": "232-594-3332",
      "email": "kends@kends.name"
    },
    {
      "_id": "owner_blahbla_blah@kends.name",
      "_rev": "1-3852935892385285",
      "type": "owner",
      "lastName": "Blahbla",
      "firstName": "Bob",
      "address": "123 Elm St., Mt. Pleasant, SC 29464",
      "phone": "232-594-3332",
      "email": "blah@kends.name"
    },
    {
      "_id": "something",
      "_rev": "1-94204385203485083450",
      "type": "owner",
      "lastName": "Blooth",
      "firstName": "Michael",
      "address": "123 Elm St., Mt. Pleasant, SC 29464",
      "phone": "232-594-3332",
      "email": "kends@kends.name"
    }
]}
