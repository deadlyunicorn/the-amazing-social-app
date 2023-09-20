import { getSessionDetails } from "@/app/(mongodb)/user";
import { MongoClient, ServerApiVersion, ObjectId, Transaction } from "mongodb";

export const addToRecentlyPosted = async (
  query: {
    documentId: ObjectId,

  },client:MongoClient)
  : Promise<any> => {


  const users = client.db('the-amazing-social-app').collection('users');
  const user = await getSessionDetails();

  if ( !user ){
    throw "Network error";
  }
  
  if ( user.latestPosts && user.latestPosts.length > 10 ){
    await users.updateOne({_id:user._id},{$pop: { latestPosts : -1}});
  }
  
  await users.updateOne({_id:user?._id},{$push: {latestPosts : query.documentId}});


  
  return true;

}

