# Pet Partner

A Pet Health Tracking app

##
```
/owners
```

### `GET /owners'


Retrieves a collection of friends as an array.
**Sample Request**

```
GET /owners
```

**Sample Response**
```
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
    }
]}
```
### `GET /owners/:id`

Gets a single owner from a collection of owners.
***Sample Request***
```
GET /owners/owner_blahbla_blah@kends.name
```
***Sample Response***
```
{
  "_id": "owner_blahbla_blah@kends.name",
  "_rev": "1-3852935892385285",
  "type": "owner",
  "lastName": "Blahbla",
  "firstName": "Bob",
  "address": "123 Elm St., Mt. Pleasant, SC 29464",
  "phone": "232-594-3332",
  "email": "blah@kends.name"
}
```
