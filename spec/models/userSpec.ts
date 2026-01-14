import { UserStore } from '../../src/models/user'
import client from '../../src/database/database'

const store = new UserStore()

describe('User Model', () => {
  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query('DELETE FROM users;')
    await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    conn.release()
  })

  afterAll(async () => {
    const conn = await client.connect()
    await conn.query('DELETE FROM users;')
    await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    conn.release()
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

  it('should create a user', async () => {
    const user = await store.create({
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123'
      
    })

    expect(user.username).toEqual('testuser')
  })
})
