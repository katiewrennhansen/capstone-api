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
            .select('messages.*', 'users.name')
            .where({ reciever_id: id })
            .leftJoin('users', 'messages.sender_id', 'users.id')
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
        return db
            .from('messages')
            .where({ 'messages.id': id })
            .first()
            .select('messages.*', 'users.name')
            .leftJoin('users', 'messages.sender_id', 'users.id')
    },
    deleteMessage(db, id){
        return db('messages')
            .where({ id })
            .delete()
    }
}

module.exports = MessagesService