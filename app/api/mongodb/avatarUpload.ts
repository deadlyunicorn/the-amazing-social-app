import { getMongoClient } from "@/app/lib/mongoClient";



export const setAvatarLink = async( username : string, url : string ) : Promise <void>=>{
  const client = getMongoClient();
  
  
  try {
    await client.connect();
    
    const users = client.db('the-amazing-social-app-v3').collection('users');

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
