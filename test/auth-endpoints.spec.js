const app = require('../src/app')
const knex = require('knex')
const jwt = require('jsonwebtoken')
const helpers = require('./test-helpers')

describe('AUTH ENDPOINTS', () => {
    let db

    const testUsers = helpers.makeUsersArray()
    const testUser = testUsers[0]

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('POST /api/login', () => {
        beforeEach('insert users', () => {
            helpers.seedUsers(db, testUsers)
        })

        it('responds with 200 on successful login', () => {
            const validCreds = {
                username: testUser.username,
                password: testUser.password
            }

            const expectedToken = jwt.sign(
                { user_id: testUser.id },
                process.env.JWT_SECRET,
                {
                    subject: testUser.username,
                    algorithm: 'HS256'
                }
            )

            return supertest(app)
                .post('/api/login')
                .send(validCreds)
                .expect(200, {
                    token: expectedToken
                })
        })
        
    })
})
