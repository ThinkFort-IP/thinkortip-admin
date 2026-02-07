import { MongoClient } from "mongodb";

let client;
let clientPromise;

if (!process.env.MONGO_URI) throw new Error("Add MONGO_URI in .env.local");

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGO_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(process.env.MONGO_URI);
  clientPromise = client.connect();
}

export async function connectToDB() {
  const client = await clientPromise;
  return client.db("ThinkFortIPDB");
}
