import supertest from 'supertest'
import app from '../../src/server'
import client from '../../src/database/database'
import { UserStore } from '../../src/models/user'
import { ProductStore } from '../../src/models/product'
import { OrderStore } from '../../src/models/order'

const request = supertest(app)
const userStore = new UserStore()
const productStore = new ProductStore()
const orderStore = new OrderStore()


describe('OrderItem Routes', () => {

  let userId: number
  let productId: number
  let orderId: number

  beforeAll(async () => {
    const user = await userStore.create({
      username: 'routeitemuser',
      email: 'routeitem@test.com',
      password: 'password123'
    })
    userId = user.id!

    const product = await productStore.create({
      name: 'Route Product',
      description: 'Route Desc',
      price: 100
    })
    productId = product.id!

    const order = await orderStore.create({
      user_id: userId,
      status: 'active'
    })
    orderId = order.id!
  })

  it('POST /order_items should create an order item', async () => {
    const response = await request.post('/order_items').send({
      order_id: orderId,
      product_id: productId,
      quantity: 2
    })

    expect(response.status).toBe(200)
    expect(response.body.order_id).toEqual(orderId)
    expect(response.body.product_id).toEqual(productId)
  })

  afterAll(async () => {
    const conn = await client.connect()
    await conn.query('DELETE FROM order_items;')
    await conn.query('DELETE FROM orders;')
    await conn.query('DELETE FROM products;')
    await conn.query('DELETE FROM users;')
    await conn.query('ALTER SEQUENCE order_items_id_seq RESTART WITH 1;')
    await conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;')
    await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;')
    await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    conn.release()
  })
})
