const http = require('http') //included with express
require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('express-jwt')
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const port = process.env.PORT || 4000 //in .env file or in command line for testing
const cors = require('cors')
const dal = require('./dal.js')

const checkJwt = jwt({
    secret: process.env.AUTH0_SECRET
})

app.use(cors({origin: true, credentials: true}))

app.use(bodyParser.json({limit: '50mb'}));
 //parses the json
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
///post handler
app.get('/protected', checkJwt, (req, res) => {
    res.send({message: "you are authorized"})
})

//////////PETS////////////////
app.post('/pets', function(req, res, next) {
    dal.createPet(req.body, function(err, result) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        res.status(201).send(result)
    })
    console.log(req.body)
})

app.get('/pets/:id', function(req, res, next) {
    const petID = req.params.id
    dal.getPet(petID, function(err, result) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (result) {
            res.status(200).send(result)
        }
    })
})

app.get('/pets', function(req, res, next) {
    dal.listPets("pet", function(err, result) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (result) {
            res.status(200).send(result)
        }
    })
})

app.put('/pets/:id', function(req, res, next) {
    dal.getPet(req.params.id, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            dal.updatePet(req.body, function callback(updattederr, updatteddoc) {
                if (updattederr) {
                    var responseError = BuildResponseError(updattederr)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (updatteddoc)
                    res.append('Content-type', 'application/json')
                res.status(200).send(updatteddoc)
            })
        }
    })

})

app.delete('/pets/:id', function(req, res, next) {
    dal.getPet(req.params.id, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            dal.deletePet(req.body, function callback(updattederr, updatteddoc) {
                if (updattederr) {
                    var responseError = BuildResponseError(updattederr)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (updatteddoc)
                    res.append('Content-type', 'application/json')
                res.status(200).send(updatteddoc)
            })
        }
    })

})
///////////Procedures///////////////
app.post('/procedures', function(req, res, next) {
    dal.createProcedure(req.body, function(err, result) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        res.status(201).send(result)
    })
    console.log(req.body)
})

app.get('/procedures/:id', function(req, res, next) {
    const procedureID = req.params.id
    dal.getProcedure(procedureID, function(err, result) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (result) {
            res.status(200).send(result)
        }
    })
})
app.get('/procedures', function(req, res, next) {
    dal.listProcedures(function(err, result) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (result) {
            res.status(200).send(result)
        }
    })
})

app.put('/procedures/:id', function(req, res, next) {
    dal.getProcedure(req.params.id, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            dal.updateProcedure(req.body, function callback(updattederr, updatteddoc) {
                if (updattederr) {
                    var responseError = BuildResponseError(updattederr)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (updatteddoc)
                    res.append('Content-type', 'application/json')
                res.status(200).send(updatteddoc)
            })
        }
    })

})

app.delete('/procedures/:id', function(req, res, next) {
    dal.getProcedure(req.params.id, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            dal.deleteProcedure(req.body, function callback(updattederr, updatteddoc) {
                if (updattederr) {
                    var responseError = BuildResponseError(updattederr)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (updatteddoc)
                    res.append('Content-type', 'application/json')
                res.status(200).send(updatteddoc)
            })
        }
    })

})

/////////Categories//////////////
app.post('/categories', function(req, res, next) {
    dal.createCategory(req.body, function(err, result) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        res.status(201).send(result)
    })
    console.log(req.body)
})

app.get('/categories/:id', function(req, res, next) {
    const catID = req.params.id
    dal.getCategory(catID, function(err, result) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (result) {
            res.status(200).send(result)
        }
    })
})

app.get('/categories', function(req, res, next) {
    dal.listCategories("category", function(err, result) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (result) {
            res.status(200).send(result)
        }
    })
})
app.put('/categories/:id', function(req, res, next) {
    dal.getCategory(req.params.id, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            dal.updateCategory(req.body, function callback(updattederr, updatteddoc) {
                if (updattederr) {
                    var responseError = BuildResponseError(updattederr)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (updatteddoc)
                    res.append('Content-type', 'application/json')
                res.status(200).send(updatteddoc)
            })
        }
    })

})

app.delete('/categories/:id', function(req, res, next) {
    dal.getCategory(req.params.id, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            dal.deleteCategory(req.body, function callback(updattederr, updatteddoc) {
                if (updattederr) {
                    var responseError = BuildResponseError(updattederr)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (updatteddoc)
                    res.append('Content-type', 'application/json')
                res.status(200).send(updatteddoc)
            })
        }
    })

})

app.get('/', function(req, res) {
    res.send('hello world')
})
app.get('*', (req, res) => res.send({ok: true})) // '*' matches any route that comes in. Used just to wire up server

function BuildResponseError(err) {

    const statuscheck = isNaN(err.message.substring(0, 3)) === true
        ? "400"
        : err.message.substring(0, 3)
    const status = err.status
        ? Number(err.status)
        : Number(statuscheck)
    const message = err.status
        ? err.message
        : err.message.substring(3)
    const reason = message
    const error = status === 400
        ? "Bad Request"
        : err.name
    const name = error

    var errormsg = {}
    errormsg.error = error
    errormsg.reason = reason
    errormsg.name = name
    errormsg.status = status
    errormsg.message = message

    console.log("BuildResponseError-->", errormsg)
    return errormsg
}

var server = http.createServer(app);
server.listen(port, () => console.log('opened server on', server.address()));
