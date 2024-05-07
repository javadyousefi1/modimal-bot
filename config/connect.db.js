// mongoo
const { MongoClient } = require("mongodb");

// connect to db
const uri =
  "mongodb://root:82BlgCJM4KZVQb7sMTg4Z1p4@etna.liara.cloud:30050/my-app?authSource=admin&replicaSet=rs0&directConnection=true";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDb() {
  try {
    return await client.connect();
    // const database = client.db("modimal");
    // const collection = database.collection("users");
    // const documents = await collection.find({}).toArray();
    // console.log(documents);
  } catch (e) {
    console.error("e");
  }
}

module.exports = { connectDb };
