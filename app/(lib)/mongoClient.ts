import { MongoClient } from "mongodb";

export const getMongoClient = () => {
  return new MongoClient(process.env.MONGODB_URI!,{
    serverSelectionTimeoutMS: 7000
  });
}