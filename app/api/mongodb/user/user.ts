import { mongoClient } from "@/app/api/mongodb/client";
import { withRetry } from "@/app/lib/retry";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { authSession } from "../../auth/types/session";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version




export const getUserInfo = async (
  query: {
    _id? : ObjectId,
    email?: string,
    username?: String,
  }

): Promise<userObject | null> => {


  const client = mongoClient;


  const users = client.db('the-amazing-social-app-v3').collection('users');

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
  const authSession = await getAuthSession();
  if ( authSession && authSession.id ){


      //@ts-ignore
    const user = await withRetry(getUserInfo,5,[{ _id: authSession.id }])
    .catch(err=>null);

    return user;
 
  }
  else {
    return null;
  }
  
  //@ts-ignore
  

  return user;
};

export const getAuthSession = async () => {

  //@ts-ignore
  const session: authSession = await getServerSession( authOptions );
  return session?.user;
}