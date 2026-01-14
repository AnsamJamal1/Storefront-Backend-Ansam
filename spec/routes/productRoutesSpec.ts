import supertest from 'supertest'
import app from '../../src/server'


const request = supertest(app)

describe('Product Routes', () => {
  it('GET /products should return 200', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200)
  })

  it('POST /products should create product', async () => {
    const response = await request.post('/products').send({
      name: 'Route Product',
      description: 'Route Description',
      price: 50
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toEqual('Route Product')
  })
})
