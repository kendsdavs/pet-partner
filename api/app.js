const http = require('http') //included with express
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const port = process.env.PORT || 3000 //in .env file or in command line for testing
const cors = require('cors')
const dal = require('./dal.js')



app.use(bodyParser.json()) //parses the json
///post handler
app.post('/owners', function(req, res, next) {
  dal.createOwner(req.body, function(err, result) {
    res.status(201).send(result)
  })
  console.log(req.body) ///given access to the "body" through "body-parser" required above
})

app.get('/owners/:id', function(req, res, next) {
  const ownerID = req.params.id
  dal.getOwner(ownerID, function(err, result) {
    res.status(200).send(result)
  })
})

app.get('/owners', function(req, res, next) {
  dal.listOwners(function(err, result) {
    res.status(200).send(result)
  })
})

app.put('/owners/:id', function(req, res, next) {
  dal.updateFriend(req.body, function(err, result) {
    res.status(200).send(result)
  })
})

app.delete('/owners/:id', function(req, res, next) {
  const ownerID = req.params.id

    dal.deleteOwner(data, function(deletteerr, deleteresult) {
      res.status(200).send(deleteresult)
    })
  
})

app.get('/', function(req, res) {
  res.send('hello world')
})
app.get('*', (req, res) => res.send({
   ok: true
})) // '*' matches any route that comes in. Used just to wire up server

var server = http.createServer(app);
server.listen(port, () => console.log('opened server on', server.address()));
