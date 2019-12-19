const express = require('express')
const jwtAuth = require('../middleware/jwt-auth')
const LocationsService = require('./locations-service')

const bodyParser = express.json()
const locationsRouter = express.Router()

locationsRouter
    .route('/')
    .get((req, res, next) => {
        const db = req.app.get('db')
        LocationsService.getAllLocations(db)
            .then(locations => {
                if(!locations){
                    res.status(404).json({
                        error: 'no available locations'
                    })
                }
                res.send(locations)
            })
            .catch(next)
    })


// locationsRouter
//     .route('/')
//     .all(jwtAuth, (req, res, next) => {
//         const db = req.app.get('db')
//         const id = req.user.id
//         MessagesService.getNewMessages(db, id)
//             .then(messages => {
//                 if(!messages){
//                     res.status(404).json({
//                         error: 'messages not found'
//                     })
//                 }
//                 res.messages = messages
//                 next()
//             })
//             .catch(next)
//     })
//     .post(bodyParser, (req, res, next) => {
//         const db = req.app.get('db')
//         const id = req.user.id
//         const { subject, body, read, reciever_id } = req.body
//         const newMessage = { subject, body, read, reciever_id }
//         newMessage.sender_id = id

//         MessagesService.postMessage(db, newMessage)
//             .then(message => {
//                 res.status(201).end(0)
//             })
//             .catch(next)
//     })



module.exports = locationsRouter;