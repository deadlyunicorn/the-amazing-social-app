import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { ServerApiVersion, MongoClient, ObjectId, Timestamp, } from "mongodb";
import { supabaseCredentials } from "../(supabase)/global";
import { cookies } from "next/headers";
import { getMongoClient } from "../(lib)/mongoClient";
import { withRetry } from "../(lib)/retry";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version




export const getUserInfo = async (
  query: {
    _id? : ObjectId,
    email?: string,
    username?: String,
  }

): Promise<userObject | null> => {


  const client = getMongoClient();


  try {
    const users = client.db('the-amazing-social-app').collection('users');

    const result: userObject | null = await users.findOne(query)
      .then(
        data => {
          if (data != null) {
            return data as userObject;
          }
          else { return null }
        }
      );
    return result;


  }
  finally {

    await client.close();

    // Ensures that the client will close when you finish/error

  }
}

export type userObject = {
  _id: ObjectId,
  age: number,
  email: string,
  username: string,
  avatarSrc?: string,
  description?: string,
  latestPosts: Array<ObjectId>
};



export const getSessionDetails = async (): Promise<userObject|null>   => {
  const session = await createServerActionClient({ cookies }, supabaseCredentials).auth.getSession();
  
  //@ts-ignore
  const user = await withRetry(getUserInfo,5,[{ email: session.data.session?.user.email }]);

  return user;
};