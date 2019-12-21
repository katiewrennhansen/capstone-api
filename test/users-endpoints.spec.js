const app = require('../src/app')
const knex = require('knex')
const helpers = require('./test-helpers')

describe('USERS ENDPOINTS', () => {
    let db

    const testUsers = helpers.makeUsersArray()

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

    describe('POST /api/users', () => {
        beforeEach('insert users', () => {
            helpers.seedUsers(db, testUsers)
        })

        it('responds with 201 on successful post user', () => {
            const newUser = {
                username: 'new',
                password: 'passypassword',
                name: 'Test User',
                email: 'testytest@email.com'
            }

            return supertest(app)
                .post('/api/users')
                .send(newUser)
                .expect(201) 
        })
        
    })
})
