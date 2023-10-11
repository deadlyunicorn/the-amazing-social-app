import { mongoClient } from "@/app/api/mongodb/client";
import { withRetry } from "@/app/lib/retry";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { authSession } from "../../auth/types/session";

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
  username: string,
  avatarSrc?: string,
  description?: string,
  lastUsernameUpdate: Date,
  ageChanged: boolean
};



export const getUserDetails = async (): Promise<userObject|null>   => {

  //@ts-ignore
  const authSession = await getAuthSession();

  if ( authSession   ){

    if ( authSession.id ) {

      //@ts-ignore
    const user = await withRetry(getUserInfo,5,[{ _id: new ObjectId(authSession.id) }])
    .catch(err=>null);

    return user;
  }
  /*
  else if ( authSession.name ){
    //@ts-ignore
    const id = authSession.name.split('^')[1];

    return id //@ts-ignore
      ? await withRetry(getUserInfo,5,[{ _id: id }])
        .catch(err=>null)
      : null;

  }

  */
 
  }
  
  //@ts-ignore
  return null

};

export const getAuthSession = async () => {



  //@ts-ignore
  const session: authSession = await getServerSession( authOptions );
  // console.log(session)

  
  const creds = session?.user.name?.split("^");

  const credsUsername = creds? creds[0] :null;
  const credsId = creds? creds[1] :null;

  
  return credsId //(creds?.length == 2) 
    ?{
      ...session?.user,
      name: credsUsername,
      id: credsId
    }
    : session?.user.email 
      ?{
        name: undefined,
        email: session?.user.email,
        image: session?.user.image,
        id: session?.user.name
      }
      :null

  
}