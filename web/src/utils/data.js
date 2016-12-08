const fetch = require('isomorphic-fetch')

const url = process.env.REACT_APP_API

module.exports = function () {
  const list = function (model) {
    return fetch(`${url}/${model}`)
      .then(res => res.json())
  }

  const post = function(model, doc) {
    return fetch(`${url}/${model}`, {
      method: 'post',
      body: JSON.stringify(doc),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json)
  }
  const get = function(model, id) {
    return fetch(`${url}/${model}/${id}`)
      .then(res => res.json())
      .then(json => { console.log(json); return json }) //tap function: accepts a value and returns the same value/debugging trip
  }

  const remove = function(model, id, doc) {
    return fetch(`${url}/${model}/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(doc),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
  }


  return {
    list,
    post,
    get,
    remove
  }
}
