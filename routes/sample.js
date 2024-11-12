// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

/* *
 * This is an example home route which renders the "home"
 * template using the 'home.json' file from the pages
 * folder to populate template data.
 */
router.get('/', (req, res) => {
  const data = req.context // {cdn:<STRING>, global:<OBJECT>}
  res.render('index', data) // render index.mustache
})

/* *
 * This is an example request for blog posts.
 * REST resources are managed in the "controllers" directory
 * where all CRUD operations can be found and customized.
 */
router.get('/posts', (req, res) => {
  const Controller = controllers.post
  const postController = new Controller()

  postController.get()
    .then(posts => {
      res.json({
        confirmation: 'success',
        data: posts
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: err.message
      })
    })
})

module.exports = router
