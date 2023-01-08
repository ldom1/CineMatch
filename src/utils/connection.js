import mongoose from "mongoose"

const MongoClient = require("mongodb").MongoClient;
const connection = {}

async function MongoDBConnect() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  connection.isConnected = db.connections[0].readyState
  console.log("MongoDB Connection is on (1:yes/0:no):", connection.isConnected)

  // Test
  const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI, { useUnifiedTopology: true }); // { useUnifiedTopology: true } removes connection warnings;

  const dbName = "epidemieDesMots";

  client
    .connect()
        .then(
          client =>
            client
              .db(dbName)
              .listCollections()
              .toArray() // Returns a promise that will resolve to the list of the collections
        )
        //.then(cols => console.log("Collections", cols))
        .finally(() => client.close());
}




export default MongoDBConnect
