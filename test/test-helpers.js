const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function makeUsersArray(){
    return [
        {
            id: 1,
            username: 'test-user-1',
            name: 'Test user 1',
            email: 'email@email.com',
            password: 'password',
            date_created: new Date('2029-01-22T16:28:32.615Z'),
          },
          {
            id: 2,
            username: 'test-user-2',
            name: 'Test user 2',
            email: 'email2@email.com',
            password: 'password',
            date_created: new Date('2029-01-22T16:28:32.615Z'),
          },
          {
            id: 3,
            username: 'test-user-3',
            name: 'Test user 3',
            email: 'email3@email.com',
            password: 'password',
            date_created: new Date('2029-01-22T16:28:32.615Z'),
          },
    ]
}

function seedUsers(db, users){
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db
        .insert(preppedUsers)
        .into('users')
        .returning('*')
}







module.exports = {
    makeUsersArray,
    seedUsers

}