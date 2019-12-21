require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const messagesRouter = require('./messages/messages-router')
const locationsRouter = require('./locations/locations-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption));
app.use(helmet())
app.use(cors())


app.use('/api/users', usersRouter)
app.use('/api/login', authRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/locations', locationsRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the Compostable API')
})


app.use(function errorHandler(error, req, res, next){
    let response
    if(NODE_ENV === 'production'){
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})


module.exports = app
