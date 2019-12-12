const express = require('express')
const AuthService = require('./auth-service')

const authRouter = express.Router()
const bodyParser = express.json()


authRouter
    .route('/')
    .post(bodyParser, (req, res, next) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        const user = { username, password }

        for (const [key, value] of Object.entries(user))
            if(!value){
                return res.status(400).json({
                    error: `missing ${key}`
                })
            }
        
        AuthService.getUserName(db, user.username)
            .then(dbUser => {
                if(!dbUser)
                    return res.status(400).json({
                        error: 'invalid username or password'
                    })
                return AuthService.comparePasswords(user.password, dbUser.password)
                    .then(match => {
                        if(!match)
                            return res.status(400).json({
                                error: 'invalid password'
                            })
                        const sub = dbUser.username
                        const payload = { user_id: dbUser.id }
                        res.send({
                            token: AuthService.generateJwt(sub, payload)
                        })
                    })
            })
            .catch(next)
    })

module.exports = authRouter