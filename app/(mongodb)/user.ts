import { MongoClient, ObjectId, Timestamp } from "mongodb";
const {  ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(process.env.MONGODB_URI!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


export const getUserInfo = async(username:string) : Promise<userObject|null>=>{
  try {
    await client.connect();
    
    const users = client.db('the-amazing-social-app').collection('users');

    const result:userObject|null = await users.findOne({email:username})
      .then(
        data=>{
          if (data!=null){
            return data as userObject;
          }
          else {return null}
        }
        );
    return result;


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