import { mongoClient } from "../api/mongodb/client";

export const postLimit = 5;

export const getPostsPageLimit = async () => {

  const client = mongoClient;

    
  const posts = client.db('the-amazing-social-app-v3').collection('posts');

  const postIterator = posts.aggregate([
    { $match: { verified:true } }, 
    { $count: "Visible Posts" }])

  for await (const verifiedPostsCount of postIterator) {
    return Math.ceil(verifiedPostsCount["Visible Posts"]/postLimit)+1;
  }


}