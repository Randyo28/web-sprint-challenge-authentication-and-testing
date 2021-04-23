const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

// const Joke1 = { joke: 'Test-1' }
// const Joke2 = { joke: 'test-2' }

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

it('testing env', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /api/auth/register', () => {
  it('registers new user', async () => {
    await request(server).post('/api/auth/register').send({
      username: 'Randy',
      password: 'password',
    })
    const Randy = await db('users').where('username', 'Randy').first()
    expect(Randy).toMatchObject({ id: 1 })
  })
  it('gives status 201', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'Randy',
      password: 'password',
    })

    expect(res.status).toBe(200)
  })
})

describe('[POST] /api/auth/login', () => {
  it('lets user with account login', async () => {
    const res = await request(server).post('/api/auth/login').send({
      username: 'Randy',
      password: 'password',
    })
    console.log(res.body)
    expect(res.body.message).toMatch('Invalid credentials')
  })

  it('gives status code 401', async () => {
    const res = await request(server).post('/api/auth/login').send({
      username: 'Randy',
      password: 'password',
    })
    console.log(res.body)
    expect(res.status).toBe(401)
  })
})
// describe('[GET] /', () => {
//   it('responds with 200 ok', async () => {
//     const res = await request(server).get('/api/jokes')
//     expect(res.status).toBe(200)
//   })
//   it('responds with all users', async () => {
//     let res
//     await db('users').insert(Joke1)
//     await db('users').insert(Joke2)
//     res = await request(server).get('/api/users')
//     expect(res.body).toHaveLength(2)
//   })
// })
