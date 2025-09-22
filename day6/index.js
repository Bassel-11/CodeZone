const { MongoClient } = require("mongodb");

const url = "mongodb+srv://albasselabobakr:albassel@learn-mongo-db.pdwl7rh.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo-db";
const client = new MongoClient(url);

const main = async () => {
  try {
    await client.connect();
    console.log("✅ Connected successfully to db");

    const db = client.db("codeZone");
    const collection = db.collection("courses");

    const data = await collection.find().toArray();
    console.log("data:", data);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
};

main();
