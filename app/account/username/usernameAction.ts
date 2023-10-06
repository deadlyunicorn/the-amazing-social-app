import { getUserDetails } from "@/app/api/mongodb/user/user";
import { mongoClient } from "@/app/api/mongodb/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as zod from "zod"

export const changeUsername = async( formData: FormData )=>{
  "use server"

  const newUsername = await zod
    .string()
    .min(6)
    .max(30)
    .regex(/^[A-Za-z]([A-Za-z0-9\_])\w+/g)
    .parseAsync(formData.get('username'))
    .catch( err=>{
      redirect(`/account/username?error=${"Invalid Username"}`)
    })
    .then( username => username.toLowerCase() );


  const client = mongoClient;
  const user = await getUserDetails();

  if ( user ){

    if ( user?.username == newUsername){
      redirect(`/account/username?error=${"This is already your username"}`);
    }
  
    if ( user?.lastUsernameUpdate && user.lastUsernameUpdate.getTime() > new Date().getTime() - 2000000000){
      redirect(`/account/username?error=${"You have already updated your username in the past 20 days"}`);
    }
    try{
  
      const users = client.db('the-amazing-social-app-v3').collection('users');
      await users.findOne({username:newUsername})
      .then( res => {
        if (res){
          throw "username used"
        }
      })

      const session = client.startSession();

  
      await users.findOneAndUpdate(
        {_id:user?._id},
        { $set:{
          username:newUsername,
          lastUsernameUpdate: new Date()
        }}
      );
      
      const accounts = client.db('the-amazing-social-app-auth').collection('accounts');
      await accounts.findOneAndUpdate(
        {_id:user?._id},
        { $set:{
          username:newUsername
        }
      });

      await session.commitTransaction();


      revalidatePath('/');
    }
    catch(error){
      if (error === "username used"){
        redirect(`/account/username?error=${"Username is already taken"}`);
      }
      redirect(`/account/username?error=${"Failed Updating"}`);
    }

  }
  else{
    redirect(`/account/username?error=${"Unauthorized"}`);
  }

  
}
