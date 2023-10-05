import { MongoClient, ServerApiVersion } from "mongodb";
import { getMongoClient } from "./mongoClient";

export const postLimit = 5;

export const getPostsPageLimit = async () => {

  const client = getMongoClient();

  try {

    
    await client.connect();

    const posts = client.db('the-amazing-social-app-v3').collection('posts');

    const postIterator = posts.aggregate([
      { $match: { verified:true } }, 
      { $count: "Visible Posts" }])

    for await (const verifiedPostsCount of postIterator) {
      return Math.ceil(verifiedPostsCount["Visible Posts"]/postLimit)+1;
    }


  } //Catching happens inside withRetry();
  finally {

    await client.close();
    // Ensures that the client will close when you finish/error

  }
}