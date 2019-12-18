CREATE TABLE messages (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    read BOOLEAN NOT NULL,
    sender_id INTEGER REFERENCES users(id)  
        ON DELETE SET NULL,
    reciever_id INTEGER REFERENCES users(id)  
        ON DELETE SET NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL
)