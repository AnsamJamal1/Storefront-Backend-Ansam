import { ProductStore } from '../../src/models/product'
import client from '../../src/database/database'

const store = new ProductStore()

describe('Product Model', () => {
  
  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query('DELETE FROM products;')
    await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;')
    conn.release()
  })

  afterAll(async () => {
    const conn = await client.connect()
    await conn.query('DELETE FROM products;')
    await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;')
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

  it('should create a product', async () => {
    const product = await store.create({
      name: 'Test Product',
      description: 'Test Description',
      price: 100
    })

    expect(product.name).toEqual('Test Product')
  })
})
