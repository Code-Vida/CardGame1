// const { MongoClient } = require('mongodb')

// let database = null
// let client = null

// async function connect() {
//   //const uri = 'mongodb://mongo:digh0s1LbYImdbYe7TDd@containers-us-west-136.railway.app:7582'
//   const uri = 'mongodb+srv://admin:admin@cluster0.dqsftdf.mongodb.net/?retryWrites=true&w=majority'
//   //const uri = 'mongodb://localhost:27017'
//   const dbName = 'cardgame'
//   client = new MongoClient(uri)

//   await client.connect((err, db) => {
//     if (err) throw err
//   })
//   database = client.db(dbName)
// }

// function MongoDB() {
//   if (!database) connect()
//   return database
// }

// MongoDB()

// module.exports = { MongoDB, client }
