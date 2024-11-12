const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID })
const Controller = vertex.Controller
const Post = require('../models/Post')

class PostController extends Controller {
  constructor () {
    super(Post, process.env)
  }

  get (params) {
    return new Promise((resolve, reject) => {
      Post.find(params, Controller.parseFilters(params))
        .then(posts => {
          resolve(Post.convertToJson(posts))
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getById (id) {
    return new Promise((resolve, reject) => {
      Post.findById(id)
        .then(post => {
          if (post == null) {
            throw new Error(Post.resourceName + ' ' + id + ' not found.')
          }

          resolve(post.summary())
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  post (body) {
    return new Promise((resolve, reject) => {
      if (body.title != null) {
        body.slug = vertex.utils.slugVersion(body.title, 6)
      }

      const dateString = vertex.utils.formattedDate() // Tuesday, May 7, 2019
      const dateParts = dateString.split(', ')
      body.dateString = (dateParts.length === 3) ? dateParts[1] + ', ' + dateParts[2] : dateString

      Post.create(body)
        .then(post => {
          resolve(post.summary())
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  put (id, params) {
    return new Promise((resolve, reject) => {
      Post.findByIdAndUpdate(id, params, { new: true })
        .then(post => {
          resolve(post.summary())
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      Post.findByIdAndRemove(id)
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

module.exports = PostController
