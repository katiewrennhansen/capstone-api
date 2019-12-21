const LocationsService = {
    getAllLocations(db){
        return db
            .from('locations')
            .select('locations.*', 'users.name')
            .leftJoin('users', 'locations.user_id', 'users.id')
    },
    getLocationById(db, id){
        return db
            .from('locations')
            .select('*')
            .where({ id })
    },
    getLocationsForUser(db, user_id){
        return db
            .from('locations')
            .select('*')
            .where({ user_id })
    },
    postLocation(db, newLocation){
        return db
            .insert(newLocation)
            .into('locations')
            .returning('*')
    },
    updateLocation(db, id, updatedLocation){
        return db('locations')
            .where({ id })
            .update(updatedLocation)
    },
    deleteLocation(db, id){
        return db('locations')
            .where({ id })
            .delete()
    }
}

module.exports = LocationsService