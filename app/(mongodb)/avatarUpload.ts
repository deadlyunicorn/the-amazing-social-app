import { MongoClient, ObjectId, Timestamp,ServerApiVersion } from "mongodb";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version



export const setAvatarLink = async( username : string, url : string ) : Promise <void>=>{
  const client = new MongoClient(process.env.MONGODB_URI!, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  
  try {
    await client.connect();
    
    const users = client.db('the-amazing-social-app').collection('users');

    await users.updateOne({username:username},{$set:{avatarSrc:url}})
      .then(
        data=>{
          if (!data.acknowledged){
            throw "Setting avatar failed";
          }
        }
      );


  } finally {

      await client.close();

    // Ensures that the client will close when you finish/error

  }
}

export type userObject={
  _id: ObjectId,
  age: number,
  email: string,
  username: string,
  latestPosts: Array<{ created_at: Timestamp, postText: string }>
}