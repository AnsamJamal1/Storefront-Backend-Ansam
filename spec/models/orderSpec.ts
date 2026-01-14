import { OrderStore } from '../../src/models/order'
import { UserStore } from '../../src/models/user'
import client from '../../src/database/database'

const orderStore = new OrderStore()
const userStore = new UserStore()

describe('Order Model', () => {

  let userId: number


  beforeAll(async () => {
    const user = await userStore.create({
      username: 'orderuser',
      email: 'order@test.com',
      password: 'password123'
    })
    userId = user.id! 
  })

  it('should have index method', () => {
    expect(orderStore.index).toBeDefined()
  })

  it('should have show method', () => {
    expect(orderStore.show).toBeDefined()
  })

  it('should have create method', () => {
    expect(orderStore.create).toBeDefined()
  })

  it('should create an order', async () => {
    const order = await orderStore.create({
      user_id: userId,
      status: 'active'
    })
    expect(order.user_id).toEqual(userId)
    expect(order.id).toBeDefined()
    const orderId: number = order.id!
  })

  afterAll(async () => {
    const conn = await client.connect()
    await conn.query('DELETE FROM orders;')
    await conn.query('DELETE FROM users;')
    await conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;')
    await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    conn.release()
  })
  
})
