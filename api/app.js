const http = require('http') //included with express
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const port = process.env.PORT || 4000 //in .env file or in command line for testing
const cors = require('cors')
const dal = require('./dal.js')

app.use(cors({origin: true, credentials: true}))

app.use(bodyParser.json()) //parses the json
///post handler

////Owners/////
app.post('/owners', function(req, res, next) {
    dal.createOwner(req.body, function(err, result) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
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
    dal.updateOwner(req.body, function(err, result) {
        res.status(200).send(result)
    })
})

app.delete('/owners/:id', function(req, res, next) {
    const ownerID = req.params.id
    dal.getOwner(ownerID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data)
            dal.deleteOwner(data, function(deletteerr, deleteresult) {
                if (deletteerr) {
                    var responseError = BuildResponseError(err)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (deleteresult)
                    console.log("Deleted " + req.path, deleteresult)
                res.append('Content-type', 'application/json')
                res.status(200).send(deleteresult)
            })
    })

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
    dal.listPets("procedure", function(err, result) {
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

    // no sql error message example
    //     { id: 'person_jackiekennedyo1922@gmail.org',
    // error: 'conflict',
    // reason: 'Document update conflict.',
    // name: 'conflict',
    // status: 409,
    // message: 'Document update conflict.',
    // ok: true }
    //
    // // custom DAL validation message example
    //
    // {
    // error: 'Bad Request',
    // reason: 'Unnecessary _id property within data.'
    // name: 'Bad Request',
    // status: 400,
    // message: 'Unnecessary _id property within data.',
    // ok: true }

    // if the first three characters are a number then return the error code otherwise
    //  default to 400 (bad request)
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

    //   { error: 'Bad Request',
    // reason: 'Missing email property within data',
    // name: 'Bad Request',
    // status: 400,
    // message: 'Missing email property within data' }
    console.log("BuildResponseError-->", errormsg)
    return errormsg
}

var server = http.createServer(app);
server.listen(port, () => console.log('opened server on', server.address()));
