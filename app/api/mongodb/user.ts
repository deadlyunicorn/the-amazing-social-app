import { supabaseCredentials } from "@/app/(supabase)/global";
import { getMongoClient } from "@/app/lib/mongoClient";
import { withRetry } from "@/app/lib/retry";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
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
  lastUsernameUpdate: Date,
  ageChanged: boolean
};



export const getSessionDetails = async (): Promise<userObject|null>   => {
  const session = await createServerActionClient({ cookies }, supabaseCredentials).auth.getSession();
  
  //@ts-ignore
  const user = await withRetry(getUserInfo,5,[{ email: session.data.session?.user.email }])
  .catch(err=>null);

  return user;
};

export const getSupabaseSession = async () => (
  (await createServerActionClient({ cookies }, supabaseCredentials).auth.getSession()).data.session?.user
)