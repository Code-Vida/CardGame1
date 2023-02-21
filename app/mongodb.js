const { MongoClient } = require('mongodb')

let database = null
let client = null

async function connect() {
  const uri = 'mongodb://localhost:27017/cardgame'
  const dbName = 'cardgame'
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  await client.connect((err, db) => {
    if (err) throw err
  })
  database = client.db(dbName)
}

function MongoDB() {
  if (!database) connect()
  return database
}

MongoDB()

module.exports = { MongoDB, client }
