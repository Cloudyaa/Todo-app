const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');
client.connect();

const db = client.db('megak_todo');
const todos = db.collection('todos');

module.exports = {
    db,
    todos,
    client,
}
