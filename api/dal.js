

var dal = {
  createPet: createPet,
  getPet: getPet,
  updatePet:updatePet,
  deletePet:deletePet,
  listOwnersPets:listOwnersPets,
  createOwner: createOwner,
  getOwner: getOwner,
  updateOwner: updateOwner,
  deleteOwner:deleteOwner,
  listOwners: listOwners

}

function createPet(data, cb) {
  const id = data.ownerID + "_pet_" + data.name
  const ownerResponse = {
    ok: true,
    id: id,
    rev: 1-32508072409672409582034958
  }
  return cb(null, ownerResponse)
}

function getPet(data, cb) {
  const petResponse = {
    id: data,
    rev: "1-32508072409672409582034958",
    lastName: "some last name"
  }
  console.log(data)
  return cb(null, petResponse)
}

function updatePet(data, cb) {
  const petResponse = {
    ok: true,
    id: data._id,
    rev: 2-32508072409672409582034958
  }
  return cb(null, petResponse)
}

function deletePet(data, cb) {
  const petResponse = {
    ok: true,
    id: data._id,
    rev: "2-32508072409672409582034958"
  }
  return cb(null, petResponse)
}
function listOwnersPets(data, cb) {
  const pets = [
    {
      "_id": "owner_davis_kends@kends.name_pet_fluffy",
      "type": "pet",
      "ownerID": "owner_davis_kends@kends.name",
      "name": "fluffy",
      "animal_type": "dog",
      "breed": "unknown",
      "dob": "1/2/14",
      "markings": "no tail",
      "gender": "male",
      "breeder": "n/a"
    },
    {
      "_id": "owner_davis_kends@kends.name_pet_mumu",
      "type": "pet",
      "ownerID": "owner_davis_kends@kends.name",
      "name": "mumu",
      "animal_type": "cat",
      "breed": "unknown",
      "dob": "1/2/14",
      "markings": "no tail",
      "gender": "male",
      "breeder": "n/a"
    }
]
  return cb(null, pets)

}

function createOwner(data, cb) {
  // data._id = "owner_" + data.lastName + "_" + data.email
  // data.type = "owner"
  // {
  //   "ok": true,
  //   "id": "owner_" + data.lastName + "_" + data.email,
  //   "rev": "1-32508072409672409582034958"
  // }
  const id = "owner_" + data.lastName + "_" + data.email
  const ownerResponse = {
    ok: true,
    id: id,
    rev: 1-32508072409672409582034958
  }
  return cb(null, ownerResponse)
}

function updateOwner(owner, cb){
  //db.put(friend)

  const ownerResponse = {
    ok: true,
    id: owner._id,
    rev: 2-32508072409672409582034958
  }
  return cb(null, ownerResponse)
}

function getOwner(data, cb) {

  const ownerResponse = {
    id: data,
    rev: "1-32508072409672409582034958",
    lastName: "some last name"
  }
  console.log(data)
  return cb(null, ownerResponse)
}

function deleteOwner(owner, cb) {

  const ownerResponse = {
    ok: true,
    id: owner._id,
    rev: 1-32508072409672409582034958

  }
  return cb(null, ownerResponse)
}
function listOwners(cb) {
  const allOwners = [{
    "_id": "owner_davis_kends@kends.name",
    "_rev": "1-1249235082058",
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
  }]
  return cb(null, allOwners)
}

module.exports = dal
