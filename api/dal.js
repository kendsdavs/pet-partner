const path = require('path')
const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
PouchDB.plugin(require('pouchdb-find'))
PouchDB.debug.enable('pouchdb:find')
const fetchConfig = require('zero-config')

var config = fetchConfig(path.join(__dirname, '..'), {dcValue: 'test'})
const urlFormat = require('url').format
const db = new PouchDB('https://kendsdavs:8Ck8e2nd_k8e2nd@kendsdavs.cloudant.com/petpartner')
// https://github.com/nolanlawson/pouchdb-find

var dal = {

    createPet: createPet,
    listPets: listPets,
    getPet: getPet,
    updatePet: updatePet,
    deletePet: deletePet,
    createProcedure: createProcedure,
    listProcedures: listProcedures,
    getProcedure: getProcedure,
    updateProcedure: updateProcedure,
    deleteProcedure: deleteProcedure,
    createCategory,
    listCategories,
    getCategory,
    updateCategory,
    deleteCategory,

}
/////Helper Functions///////
function getDocByID(id, callback) {
    // Call to couch retrieving a document with the given _id value.
    if (typeof id == "undefined" || id === null) {
        return callback(new Error('400Missing id parameter'));
    } else {
        db.get(id, function(err, data) {
            if (err)
                return callback(err);
            if (data)
                return callback(null, data);
            }
        );
    }
}

function updateDoc(data, callback) {
    // Call to couch retrieving a document with the given _id value.
    if (typeof data == "undefined" || data === null) {
        return callback(new Error('400Missing data for update'));
    } else if (data.hasOwnProperty('_id') !== true) {
        return callback(new Error('400Missing id property from data'));
    } else if (data.hasOwnProperty('_rev') !== true) {
        return callback(new Error('400Missing rev property from data'));
    } else {
        db.put(data, function(err, response) {
            if (err)
                return callback(err);
            if (response)
                return callback(null, response);
            }
        );
    }
}

function deleteDoc(data, callback) {
    if (typeof data == "undefined" || data === null) {
        return callback(new Error('400Missing data for delete'));
    } else if (data.hasOwnProperty('_id') !== true) {
        return callback(new Error('400Missing _id property from data'));
    } else if (data.hasOwnProperty('_rev') !== true) {
        return callback(new Error('400Missing _rev property from data'));
    } else {
        db.remove(data, function(err, response) {
            if (err)
                return callback(err);
            if (response)
                return callback(null, response);
            }
        );
    }
}
function listDocsByType(data, cb) {
    db.find({
        selector: {
            type: {
                $eq: data
            }
        }
    }).then(function(result) {
        console.log("results: ", result)
        return cb(null, result)
    }).catch(function(err) {
        console.log("err: ", err)
        return cb(err)
    })
}

///////Pets/////////

function createPet(data, cb) {
    data._id = "pet_" + data.name
    data.type = "pet"
    db.put(data, function(err, response) {
        if (err) {
            console.log(err)
            return cb(err)
        }
        console.log("pet added ", response)
        return cb(null, response)
    })
}

function getPet(data, cb) {
    getDocByID(data, cb)
}

function updatePet(data, cb) {
    updateDoc(data, cb)
}

function deletePet(data, cb) {
    deleteDoc(data, cb)
}
function listPets(data, cb) {
    listDocsByType(data, cb)
}

/////////Procedures///////////
function createProcedure(data, cb) {

    data.type = "procedure"
    db.post(data, function(err, response) {
        if (err) {
            console.log(err)
            return cb(err)
        }
        console.log("pet added ", response)
        return cb(null, response)
    })
}

function getProcedure(data, cb) {
  getDocByID(data,cb)
}

function updateProcedure(data, cb) {
  updateDoc(data,cb)
}

function deleteProcedure(data, cb) {
  deleteDoc(data,cb)
}
function listProcedures(data, cb) {
  listDocsByType(data,cb)
}

//////Categories////////
function createCategory(data, cb) {
    data._id = "category_" + data.name
    data.type = "category"
    db.put(data, function(err, response) {
        if (err) {
            console.log(err)
            return cb(err)
        }
        console.log("category added ", response)
        return cb(null, response)
    })
}
function getCategory(data, cb) {
  getDocByID(data,cb)
}

function updateCategory(data, cb) {
  updateDoc(data,cb)
}

function deleteCategory(data, cb) {
  deleteDoc(data,cb)
}
function listCategories(data, cb) {
  listDocsByType(data,cb)
}

module.exports = dal
