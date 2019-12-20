const MessagesService = {
    getSentMessages(db, id){
        return db
            .from('messages')
            .select('messages.*', 'users.name')
            .where({ sender_id: id })
            .leftJoin('users', 'messages.reciever_id', 'users.id')
    },
    getNewMessages(db, id){
        return db
            .from('messages')
            .select('*')
            .where({ reciever_id: id })
    },
    postMessage(db, newMessage){
        return db
            .insert(newMessage)
            .into('messages')
            .returning('*')
    },
    updateMessage(db, id, updatedMessage){
        return db('messages')
            .where({ id })
            .update(updatedMessage)
    },
    getMessageById(db, id){
        return db('messages')
            .where({ id })
            .first()
    },
    deleteMessage(db, id){
        return db('messages')
            .where({ id })
            .delete()
    }
}

module.exports = MessagesService