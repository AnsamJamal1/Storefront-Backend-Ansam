import supertest from 'supertest'
import app from '../../src/server'


const request = supertest(app)

describe('Order Routes', () => {
  it('GET /orders should return 200', async () => {
    const response = await request.get('/orders')
    expect(response.status).toBe(200)
  })
})
