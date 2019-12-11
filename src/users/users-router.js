const express = require('express')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const bodyParser = express.json()

usersRouter
    .route('/')
    .get((req, res, next) => {
        const db = req.app.get

    })
    .post(bodyParser, (req, res, next) => {
        const db = req.app.get('db')
        const { username, password, name, email } = req.body
        const newUser = { username, password, name, email }
        console.log(newUser)
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

usersRouter
    .route('/:id')
    .all((req, res, next) => {
        const db = req.app.get('db')
        const id = req.params.id
        UsersService.getUserById(db, id)
            .then(user => {
                if(!user)
                    res.status(404).json({
                        error: 'user not found'
                    })
                res.user = user
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.send(res.user)
    })
    .delete((req, res, next) => {
        const db = req.app.get('db')
        const id = req.params.id
        UsersService.deleteUser(db, id)
            .then(user => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = usersRouter