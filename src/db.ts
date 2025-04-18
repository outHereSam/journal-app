import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
await client.connect();

export const db = client.db("journal");
export const journalCollection = db.collection("entries");
