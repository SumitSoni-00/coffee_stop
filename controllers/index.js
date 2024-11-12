const PostController = require('./PostController')
const ItemController = require('./ItemController')
const OrderController = require('./OrderController')

module.exports = {
  post: PostController,
  item: ItemController,
  order: OrderController
}
