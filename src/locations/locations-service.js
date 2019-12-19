const LocationsService = {
    getAllLocations(db){
        return db
            .from('locations')
            .select('*')
    },
    getLocationById(db, id){
        return db
            .from('locations')
            .select('*')
            .where({ id })
    },
    postLocation(db, newLocation){
        return db
            .insert(newLocation)
            .into('location')
            .returning('*')
    },
    updateLocation(db, id, updatedLocation){
        return db('locations')
            .where({ id })
            .update(updatedLocation)
    },
}

module.exports = LocationsService