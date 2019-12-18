const MessagesService = {
    getSentMessages(db, id){
        return db
            .from('messages')
            .select('*')
            .where({ sender_id: id })
            .orWhere({ reciever_id: id })
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
    }
}

module.exports = MessagesService