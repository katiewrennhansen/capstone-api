const bcrypt = require('bcryptjs')

const UsersService = {
    hashPassword(password){
        return bcrypt.hash(password, 12)
    },
    addUser(db, user){
        return db
            .insert(user)
            .into('users')
            .returning('*')
            .then(([user]) => user)
    },
    userExists(db, username){
        return db('users')
            .where({ username })
            .first()
            .then(user => !!user)
    },
    getUserById(db, id){
        return db('users')
            .where({ id })
            .first()
    },
    updateUser(db, id, updatedUser){
        return db('users')
            .where({ id })
            .update(updatedUser)
    }
}



module.exports = UsersService