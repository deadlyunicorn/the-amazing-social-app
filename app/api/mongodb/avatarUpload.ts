import { mongoClient } from "@/app/api/mongodb/client";
import { redirect } from "next/navigation";



export const setAvatarLink = async( username : string, url : string ) : Promise <void>=>{
  const client = mongoClient;
  
  
  try {
    const users = client.db('the-amazing-social-app-v3').collection('users');

    await users.updateOne({username:username},{$set:{avatarSrc:url}})
      .then(
        data=>{
          if (!data.acknowledged){
            throw "Setting avatar failed";
          }
        }
      );


  }
  catch(err){
    redirect(`/user/${username}?error=${err}`)
  }
}
