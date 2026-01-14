import supertest from 'supertest'
import app from '../../src/server'


const request = supertest(app)

describe('User Routes', () => {
  beforeAll(async () => {
    await request.delete('/users/1').catch(() => {})
  })

  it('GET /users should return 200', async () => {
    const response = await request.get('/users')
    expect(response.status).toBe(200)
  })

  it('POST /users should create user', async () => {
    const response = await request.post('/users').send({
      username: 'routeuser',
      email: 'route@test.com',
      password: 'password123'
    })
    expect(response.status).toBe(200)
    expect(response.body.username).toEqual('routeuser')
  })
})
