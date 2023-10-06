import { MongoClient } from "mongodb";

export const mongoClient = new MongoClient(process.env.MONGODB_URI!,{
  maxPoolSize: 10,
});

export const mongoClientPromise = mongoClient.connect();