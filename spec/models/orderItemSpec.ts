import { OrderItemStore } from '../../src/models/order_item'
import { OrderStore } from '../../src/models/order'
import { ProductStore } from '../../src/models/product'
import { UserStore } from '../../src/models/user'
import client from '../../src/database/database'

const store = new OrderItemStore()
const orderStore = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()

describe('OrderItem Model', () => {

  let userId: number
  let productId: number
  let orderId: number

  beforeAll(async () => {
    const user = await userStore.create({
      username: 'itemuser',
      email: 'item@test.com',
      password: 'password123'
    })
    userId = user.id!

    const product = await productStore.create({
      name: 'Item Product',
      description: 'Item Desc',
      price: 50
    })
    productId = product.id!

    const order = await orderStore.create({
      user_id: userId,
      status: 'active'
    })
    orderId = order.id!
  })

  it('should have index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should create an order item', async () => {
    const item = await store.create({
      order_id: orderId,
      product_id: productId,
      quantity: 3
    })
    expect(item.order_id).toEqual(orderId)
    expect(item.product_id).toEqual(productId)
    expect(item.id).toBeDefined()
    const itemId: number = item.id!
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
