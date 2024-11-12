const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/', async (req, res, next) => {
  console.log(req.context)
  const data = req.context

  const itemCtr = controllers.item.instance()
  data.coffee = await itemCtr.get({category: 'coffee'})
  data.tea = await itemCtr.get({category: 'tea'})
  data.pastries = await itemCtr.get({category: 'pastries'})

  res.render('home', data)
})

router.get('/blog', (req, res, next) => {

  res.render('blog', req.context)
})

router.get('/items', async (req, res, next) => {
  const filters = req.query
  const itemCtr = controllers.item.instance()
  const items = await itemCtr.get(filters)

  res.json({
    items
  })
})

router.post('/order', async (req, res, next) => {
  const orderData = req.body

  const orderCtr = controllers.order.instance()
  const order = await orderCtr.post(orderData)

  res.json(order)
})

module.exports = router
