
var dal = {
  createOwner: createOwner,
  getOwner: getOwner,
  deleteOwner:deleteOwner,
  updateFriend: updateFriend

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

function updateFriend(owner, cb){
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
    id: data._id,
    rev: 1-32508072409672409582034958,
    lastName: data.lastName
  }
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

module.exports = dal
