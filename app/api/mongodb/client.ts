import { MongoClient } from "mongodb";

export const mongoClient = new MongoClient(process.env.MONGODB_URI!);

export const mongoClientPromise = mongoClient.connect();