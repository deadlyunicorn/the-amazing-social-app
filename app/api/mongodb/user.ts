import { getMongoClient } from "@/app/lib/mongoClient";
import { withRetry } from "@/app/lib/retry";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "../auth/[...nextauth]/route";
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



export const getUserDetails = async (): Promise<userObject|null>   => {

  //@ts-ignore
  const session = await getServerSession( authOptions );
  if ( session && session.user ){
    if ( session.user.name ){

      //@ts-ignore
      const user = await withRetry(getUserInfo,5,[{ username: session.user.name }])
      .catch(err=>null);

      return user;

    }
    else if ( session.user.email ){

      //@ts-ignore
      const user = await withRetry(getUserInfo,5,[{ username: session.user.email }])
      .catch(err=>null);

      return user;
    }
  }
  else {
    return null;
  }
  
  //@ts-ignore
  

  return user;
};

export const getAuthSession = async () => (

  //@ts-ignore
  (await getServerSession( authOptions ))?.user
)