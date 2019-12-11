const express = require('express')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const bodyParser = express.json()

usersRouter
    .route('/')
    .get((req, res, next) => {
        res.send('hit the users route')
    })
    .post(bodyParser, (req, res, next) => {
        const db = req.app.get('db')
        const { username, password, name, email } = req.body
        const newUser = { username, password, name, email }

        for (const [key, value] of Object.entries(newUser))
            if(value == null){
                return res.status(400).json({
                    error: 'missing data'
                })
            }

        UsersService.userExists(db, newUser.username)
            .then(user => {
                if(user){
                    return res.status(400).json({
                        error: 'username taken'
                    })
                }
                return UsersService.hashPassword(newUser.password)
                    .then(hashedPassword => {
                        const newUser = {
                            name,
                            email,
                            username,
                            password: hashedPassword,
                        }
                        return UsersService.addUser(db, newUser)
                            .then(user => {
                                res.status(201).json(user)
                            })
                    })
            })
            .catch(next)
    })


module.exports = usersRouter