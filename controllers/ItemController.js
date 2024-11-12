const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID })
const Controller = vertex.Controller
const Item = require('../models/Item')

class ItemController extends Controller {
  constructor () {
    super(Item, process.env)
  }

  get (params) {
    return new Promise((resolve, reject) => {
      Item.find(params, Controller.parseFilters(params))
        .then(items => {
          resolve(Item.convertToJson(items))
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getById (id) {
    return new Promise((resolve, reject) => {
      Item.findById(id)
        .then(item => {
          if (item == null) {
            throw new Error(Item.resourceName + ' ' + id + ' not found.')
          }

          resolve(item.summary())
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  post (body) {
    return new Promise((resolve, reject) => {
      Item.create(body)
        .then(item => {
          resolve(item.summary())
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  put (id, params) {
    return new Promise((resolve, reject) => {
      Item.findByIdAndUpdate(id, params, { new: true })
        .then(item => {
          resolve(item.summary())
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      Item.findByIdAndRemove(id)
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

module.exports = ItemController

