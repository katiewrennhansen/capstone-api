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
    .all(jwtAuth)
    .post(bodyParser, (req, res, next) => {
        const db = req.app.get('db')
        const { latitude, longitude, description, address, city, state, zip_code } = req.body
        const id = req.user.id
        const newLocation = { latitude, longitude, description, address, city, state, zip_code }
        newLocation.user_id = id
        
        LocationsService.postLocation(db, newLocation)
            .then(location => {
                res.status(201).end()
            })
            .catch(next)
    })


locationsRouter
    .route('/all')
    .all(jwtAuth, (req, res, next) => {
        const db = req.app.get('db')
        const user_id = req.user.id
        LocationsService.getLocationsForUser(db, user_id)
            .then(locations => {
                if(!locations){
                    res.status(404).json({
                        error: 'no locations for this user'
                    })
                }
                res.locations = locations
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.send(res.locations)
    })

locationsRouter
    .route('/:id')
    .all(jwtAuth, (req, res, next) => {
        const db = req.app.get('db')
        const id = req.params.id
        LocationsService.getLocationById(db, id)
            .then(location => {
                if(!location){
                    res.status(404).json({
                        error: 'no locations for this user'
                    })
                }
                res.location = location
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.send(res.location)
    })
    .patch(bodyParser, (req, res, next) => {
        const db = req.app.get('db')
        const id = req.params.id
        const { latitude, longitude, description, address, city, state, zip_code } = req.body
        const user_id = req.user.id
        const updatedLocation = { latitude, longitude, description, address, city, state, zip_code }
        updatedLocation.user_id = user_id

        for (const [key, num] of Object.entries(updatedLocation))
            if(num == 0)
                return res.status(400).json({
                    error: 'need content'
                })

        LocationsService.updateLocation(db, id, updatedLocation)
            .then(location => {
                res.status(201).end()
            })
            .catch(next)

    })
    .delete((req, res, next) => {
        const db = req.app.get('db')
        const id = req.params.id
        LocationsService.deleteLocation(db, id)
            .then(location => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = locationsRouter;